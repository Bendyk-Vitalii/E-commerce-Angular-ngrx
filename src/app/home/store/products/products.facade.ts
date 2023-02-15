import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductsApiActions } from './products.actions';
import * as ProductsSelectors from './products.selectors';

@Injectable()
export class ProductsFacade {
  products$ = this.store.select(ProductsSelectors.productsSelector);

  constructor(private store: Store) {}

  getProducts(count: string, sort: string, category?: string) {
    this.store.dispatch(
      ProductsApiActions.productsListRequest({ count, sort, category })
    );
  }
}
