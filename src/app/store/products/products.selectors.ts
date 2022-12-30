import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const selectProducts =
  createFeatureSelector<ReadonlyArray<Product>>('products');

export const productsSelector = createSelector(
  selectProducts,
  (products) => products
);

export const selectCategories =
  createFeatureSelector<ReadonlyArray<string>>('categories');

export const categoriesSelector = createSelector(
  selectProducts,
  (categories) => categories
);
