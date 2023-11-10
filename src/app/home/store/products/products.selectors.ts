import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState } from '@home/interface/ProductsStore.model';
import { PRODUCTS_FEATURE_KEY } from './products.reducer';

export const selectProducts = createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY)


export const productsSelector = createSelector(
  selectProducts,
  (state) => state.products
);

export const selectProductById = (productId: number) =>
  createSelector(
    selectProducts,
    (state) => state.products.find(product => product.id === productId)
  );
