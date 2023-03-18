import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CART_FEATURE_KEY,
  selectCartItems,
  selectShoppingCartState,
  ShoppingCartState,
} from './cart.reducers';
//import { ShoppingCartState } from '@shopping-cart/interface/cart.interface';
import { cartAdapter } from './cart.reducers';

export const selectShoppingCart =
  createFeatureSelector<ShoppingCartState>(CART_FEATURE_KEY);

//export const { selectAll: selectAllCartItems } = cartAdapter.getSelectors();
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

// export const cartEntitiesSelector = createSelector(
//   selectCartEntities,
//   (state) => state
// );
