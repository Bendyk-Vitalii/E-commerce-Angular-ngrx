import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
import { debounceTime, of, Subscription, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductsFacade } from '@home/store/products/products.facade';
import { CategoriesFacade } from '@home/store/categories/categories.facade';
import { CartFacade } from '@shopping-cart/store/cart.facade';
import { Product } from '@shared/interface';
import { DataSorterService } from '@shared/services/data-sorter.service';
import { SearchFormValidators } from '@home/utils/search-input-validator.validator';
import { DEFAULT_DURATION } from '@shared/constants';
import { MenuService } from '@shared/services/open-menu.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public sort = 'desc';
  public count = '12';
  public cols: number = 3;
  public rowHeight = ROWS_HEIGHT[this.cols];
  private resizeSubscription!: Subscription;

  public category?: string;
  public products$ = this.productsFacade.products$;
  public categories$ = this.categoriesFacade.categories$;

  public searchForm = new FormGroup(
    {
      search: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    },
    { validators: SearchFormValidators.searchValidator() }
  );

  constructor(
    private breakpointObserver$: BreakpointObserver,
    private _snackBar: MatSnackBar,
    private menuService: MenuService,
    private productsFacade: ProductsFacade,
    private categoriesFacade: CategoriesFacade,
    private cartFacade: CartFacade,
    private dataSorterService: DataSorterService
  ) {}

  get control() {
    return this.searchForm.controls;
  }

  ngOnInit(): void {
    this.products$.pipe(take(1)).subscribe((products) => {
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
    this.resizeSubscription = this.breakpointObserver$
      .observe(Breakpoints.XSmall)
      .pipe(debounceTime(100))
      .subscribe((result) => {
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
    this._snackBar.open('Add Item Success', 'Ok', {
      duration: DEFAULT_DURATION,
    });
    this.menuService.openMenu();
  }

  onSearch(): void {
    const searchForm = this.searchForm.get('search');
    const searchValue: string | null = this.searchForm.getRawValue().search;
    let actualProductsArrray: ReadonlyArray<Product> = [];

    if (!searchValue || searchForm!.invalid) {
      return;
    }
    this.products$
      .pipe(take(1))
      .subscribe(
        (products: ReadonlyArray<Product>) => (actualProductsArrray = products)
      );
    const filteredArray = this.dataSorterService.filterForSearch(
      actualProductsArrray,
      searchValue
    );

    filteredArray.length
      ? (this.products$ = of(filteredArray))
      : this._snackBar.open('No Matches', 'Error', {
          duration: DEFAULT_DURATION,
        });
    this.searchForm.reset();
  }

  public onSortByPrice(sortBy: string): void {
    this.products$
      .pipe(take(1))
      .subscribe(
        (products: ReadonlyArray<Product>) =>
          (this.products$ = of(
            this.dataSorterService.sortByPrice(products, sortBy)
          ))
      );
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
