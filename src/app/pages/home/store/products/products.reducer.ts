import { createReducer, on } from '@ngrx/store';

import { Product } from '@models';
import { ProductsApiActions } from './products.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State {
  products: ReadonlyArray<Product>;
}

// const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();
// //export const adapter: EntityAdapter;

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

// export const categoriesReducer = createReducer(
//   initialCategoriesState,
//   on(CategoriesActions.loadedSuccess, (_state, { categories }) => categories)
// );
