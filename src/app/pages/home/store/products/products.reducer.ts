import { createReducer, on } from '@ngrx/store';

import { Product } from '@models';
import { ProductsApiActions } from './products.actions';

export interface State {
  products: ReadonlyArray<Product>;
}

const initialState: State = {
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsApiActions.loadedSuccess, (state, { products }) => {
    return {
      products,
    };
  })
);
