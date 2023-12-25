import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CART_FEATURE_KEY,
  selectCartItems,
  selectShoppingCartState,
  ShoppingCartState,
} from './cart.reducers';

export const selectShoppingCart =
  createFeatureSelector<ShoppingCartState>(CART_FEATURE_KEY);

export const cartSelector = createSelector(
  selectShoppingCartState,
  selectCartItems
);

export const totalPriceSelector = createSelector(
  selectShoppingCartState,
  (state) => state.totalPrice
);

export const totalQuantitySelector = createSelector(
  selectShoppingCartState,
  (state) => state.totalQuantity
);

