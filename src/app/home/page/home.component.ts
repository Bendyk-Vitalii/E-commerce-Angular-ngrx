import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '@shared/interface/product.interface';
import { ProductsFacade } from '@home/store/products/products.facade';
import { CategoriesFacade } from '@home/store/categories/categories.facade';
import { CartFacade } from '@shopping-cart/store/cart.facade';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private screenWidth!: number;
  public cols!: number;
  public category?: string;
  public rowHeight = ROWS_HEIGHT[this.cols];
  public products$ = this.productsFacade.products$;
  public categories$ = this.categoriesFacade.categories$;
  public sort = 'desc';
  public count = '12';
  public productsSubscription?: Subscription;

  constructor(
    private productsFacade: ProductsFacade,
    private categoriesFacade: CategoriesFacade,
    private cartFacade: CartFacade
  ) {}

  ngOnInit(): void {
    this.products$.subscribe((products) => {
      if (!products.length) {
        this.productsFacade.getProducts(this.count, this.sort);
      }
    });

    this.categories$.subscribe((categories) => {
      if (!categories.length) {
        this.categoriesFacade.getCategories();
      }
    });

    this.screenWidth = window.innerWidth;
    this.onColumnsCountChange(3);
  }

  private getProducts(
    count = this.count,
    sortBy = this.sort,
    category = this.category
  ): void {
    this.productsFacade.getProducts(count, sortBy, category);
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
    const cartItem = {
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    };
    this.cartFacade.addItem(cartItem);
  }
}
