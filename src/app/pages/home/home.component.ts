import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { CartService } from '@services';
import { Product } from '@models';
import { ProductsApiActions } from './store/products/products.actions';
import { productsSelector } from './store/products/products.selectors';
import { selectCategories } from './store/categories/categories.selectors';
import { retrieveCategories } from './store/categories/categories.action';
import { AppState } from 'src/app/store/app.reducer';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private screenWidth!: number;
  public cols!: number;
  public category?: string;
  public rowHeight = ROWS_HEIGHT[this.cols];
  public products$ = this.store
    .select((store) => store.products.products)
    .pipe((products) => products);
  public categories$ = this.store
    .select((store) => store.categories.categories)
    .pipe((categories) => categories);

  public sort = 'desc';
  public count = '12';
  public productsSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getProducts();
    this.getCategories();
    this.onColumnsCountChange(3);
  }

  private getProducts(): void {
    this.store.dispatch(
      ProductsApiActions.retrievedProductsList({
        count: this.count,
        sort: this.sort,
      })
    );
  }

  private getCategories(): void {
    this.store.dispatch(retrieveCategories());
  }

  onColumnsCountChange(colsNumber: number) {
    if (this.screenWidth <= 700) {
      this.cols = 1;
      this.rowHeight = ROWS_HEIGHT[this.cols];
    } else {
      this.cols = colsNumber;
      this.rowHeight = ROWS_HEIGHT[this.cols];
    }
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
}
