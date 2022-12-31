import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCategories =
  createFeatureSelector<ReadonlyArray<string>>('categories');

export const CategoriesSelector = createSelector(
  selectCategories,
  (categories) => categories
);
