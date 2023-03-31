import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { distinctUntilChanged, map, Observable, of, tap } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ProductsFacade } from '@home/store/products/products.facade';
import { CategoriesFacade } from '@home/store/categories/categories.facade';
import { CartFacade } from '@shopping-cart/store/cart.facade';
import { Product } from '@shared/interface';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public cols: number = 3;
  public rowHeight = ROWS_HEIGHT[this.cols];

  public isSmallScreen$: Observable<boolean> = of(false);
  public category?: string;
  public products$ = this.productsFacade.products$;
  public categories$ = this.categoriesFacade.categories$;
  public sort = 'desc';
  public count = '12';

  constructor(
    private productsFacade: ProductsFacade,
    private categoriesFacade: CategoriesFacade,
    private cartFacade: CartFacade,
    private breakpointObserver$: BreakpointObserver,
    private cdr: ChangeDetectorRef
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
  }

  @HostListener('window:resize')
  onResize() {
    this.breakpointObserver$.observe(Breakpoints.XSmall).subscribe((result) => {
      result.matches
        ? this.onColumnsCountChange(1)
        : this.onColumnsCountChange(3);
    });
  }

  private getProducts(
    count = this.count,
    sortBy = this.sort,
    category = this.category
  ): void {
    this.productsFacade.getProducts(count, sortBy, category);
  }

  onColumnsCountChange(colsNumber: number) {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
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
