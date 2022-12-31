import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from './categories.action';

export interface State {
  categories: ReadonlyArray<string>;
}
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
