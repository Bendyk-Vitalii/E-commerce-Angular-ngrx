import { ProductsApiActions } from './products.actions';
import { createReducer, on } from '@ngrx/store';

import { Product } from './../../models/product.model';

export const initialState: ReadonlyArray<Product> = [];

export const productsReducer = createReducer(
  initialState,
  on(
    ProductsApiActions.retrievedProductsList,
    (_state, { products }) => products
  )
);
