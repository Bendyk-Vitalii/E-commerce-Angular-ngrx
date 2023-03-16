import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CART_FEATURE_KEY,
  ShoppingCartState,
} from './cart.reducers';
//import { ShoppingCartState } from '@shopping-cart/interface/cart.interface';
import { cartAdapter } from './cart.reducers';

export const selectShoppingCart =
  createFeatureSelector<ShoppingCartState>(CART_FEATURE_KEY);

export const { selectAll: selectAllCartItems } = cartAdapter.getSelectors();
export const cartSelector = createSelector(
  selectShoppingCart,
  (state) => state.entities
);

export const totalPriceSelector = createSelector(
  selectShoppingCart,
  (state) => state.totalPrice
);

export const totalQuantitySelector = createSelector(
  selectShoppingCart,
  (state) => state.totalQuantity
);

// export const cartEntitiesSelector = createSelector(
//   selectCartEntities,
//   (state) => state
// );
