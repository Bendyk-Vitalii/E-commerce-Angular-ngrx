import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CategoriesState, CATEGORIES_FEATURE_KEY } from './categories.reducer';

export const selectCategories =
  createFeatureSelector<CategoriesState>(CATEGORIES_FEATURE_KEY);

export const categoriesSelector = createSelector(
  selectCategories,
  (state) => state.categories
);
