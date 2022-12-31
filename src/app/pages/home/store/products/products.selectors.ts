import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '@models';

export const selectProducts =
  createFeatureSelector<ReadonlyArray<Product>>('products');

export const productsSelector = createSelector(
  selectProducts,
  (products) => products
);
