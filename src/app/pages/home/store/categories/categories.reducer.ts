import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from './categories.action';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoriesPartialState {
  readonly [CATEGORIES_FEATURE_KEY]: State;
}

export interface State {
  categories: ReadonlyArray<string>;
};

export const initialState: State = {
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
