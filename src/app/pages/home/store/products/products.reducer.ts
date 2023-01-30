import { createReducer, on } from '@ngrx/store';

import { Product } from '@shared/product.interface';
import { ProductsApiActions } from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export interface State {
  products: ReadonlyArray<Product>;
}

const initialState: State = {
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsApiActions.loadedSuccess, (_state, { products }) => ({
    products,
  }))
);
