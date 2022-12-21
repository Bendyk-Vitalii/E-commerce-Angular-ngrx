import { AppStateInterface } from './../../models/appState.model';
import { productsSelector } from '../../store/products/products.selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as ProductsActions from './../../store/products/products.actions';

// import { StoreService } from 'src/app/services/Api.service';
import { ApiService, CartService } from '@services';
import { Product } from '@models';
import { LOAD_PRODUCTS_TYPE } from 'src/app/store/products/products.effects';
import { ProductsApiActions } from './../../store/products/products.actions';

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
  public category: string | undefined;
  public rowHeight = ROWS_HEIGHT[this.cols];
  public products$ = this.store.select(productsSelector);
  public test: any;
  public sort = 'desc';
  public count = '12';
  public productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getProducts();
    this.onColumnsCountChange(3);
  }

  public getProducts(): void {
    this.apiService
      .getAll(this.count, this.sort, this.category)
      .subscribe((products) =>
        this.store.dispatch(
          ProductsApiActions.retrievedProductsList({ products })
        )
      );
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

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   if (this.productsSubscription) {
  //     this.productsSubscription.unsubscribe();
  //   }
  // }
}
