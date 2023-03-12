import { createReducer, on } from '@ngrx/store';

import { ProductsState } from '@home/interface/ProductsStore.model';
import { ProductsApiActions } from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

const initialState: ProductsState = {
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsApiActions.loadedSuccess, (_state, { products }) => ({
    products,
  }))
);
