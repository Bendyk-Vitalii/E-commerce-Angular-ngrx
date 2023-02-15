import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from './categories.action';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoriesPartialState {
  readonly [CATEGORIES_FEATURE_KEY]: CategoriesState;
}

export interface CategoriesState {
  categories: ReadonlyArray<string>;
};

export const initialState: CategoriesState = {
  categories: [],
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.loadedSuccess, (_state, { categories }) => {
    return {
      categories,
    };
  })
);
