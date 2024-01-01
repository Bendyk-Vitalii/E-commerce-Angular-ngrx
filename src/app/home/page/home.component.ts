import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { of, Subscription, take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';

import { ProductsFacade } from '@home/store/products/products.facade';
import { CategoriesFacade } from '@home/store/categories/categories.facade';
import { CartFacade } from '@shopping-cart/store/cart.facade';
import { Product } from '@shared/interface';
import { DataSorterService } from '@shared/services/data-sorter.service';
import { SearchFormValidators } from '@shared/utils/search-input-validator.validator';
import { DEFAULT_DURATION } from '@shared/constants';
import { MenuService } from '@shared/services/open-menu.service';
import { ResponsiveService } from '@shared/services/responsive.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public sort = 'desc';
  public count = '12';
  public cols!: number;
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
    private _snackBar: MatSnackBar,
    private responsiveService: ResponsiveService,
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
    this.responsiveColumns();
  }

  private getProducts(
    count = this.count,
    sortBy = this.sort,
    category = this.category
  ): void {
    this.productsFacade.getProducts(count, sortBy, category);
  }

  private responsiveColumns(cols = this.cols): void {
    this.responsiveService.getScreenWidth().subscribe((width) => {
      updateColsBasedOnWidth(width);
    });

    function updateColsBasedOnWidth(width: number): void {
      if (width < 600) {
        cols = 1; // Phone screens
      } else if (width < 900) {
        cols = 2; // Tablets
      } else {
        cols = 3; // Laptops
      }
    }
    console.log(cols)
    this.onColumnsCountChange(cols);
  }

  public onColumnsCountChange(colsNumber: number) {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  public onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  public onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  public onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  public onAddToCart(product: Product): void {
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

  public onSearch(): void {
    const searchForm = this.searchForm.get('search');
    const searchValue: string | null = this.searchForm.getRawValue().search;
    let actualProductsArray: ReadonlyArray<Product> = [];

    if (!searchValue || searchForm!.invalid) {
      return;
    }
    this.products$
      .pipe(take(1))
      .subscribe(
        (products: ReadonlyArray<Product>) => (actualProductsArray = products)
      );
    const filteredArray = this.dataSorterService.filterForSearch(
      actualProductsArray,
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
