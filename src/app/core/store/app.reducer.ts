import { ActionReducerMap } from '@ngrx/store';

import * as fromProducts from '@pages/home/store/products/products.reducer';
import * as fromCategories from '@pages/home/store/categories/categories.reducer';
import * as fromAuth from '@pages/auth/store/auth.reducers';
import * as authState from '@pages/auth/store/auth.model';

export interface AppState {
  products: fromProducts.State;
  categories: fromCategories.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  categories: fromCategories.categoriesReducer,
};
