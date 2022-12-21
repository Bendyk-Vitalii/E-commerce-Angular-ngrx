import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Product } from '../../models/product.model';

export const selectProducts =
  createFeatureSelector<ReadonlyArray<Product>>('products');

export const productsSelector = createSelector(
  selectProducts,
  (products) => products
);
