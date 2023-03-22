import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
} from '@ngrx/entity';
import {
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';

import { CartItem } from '@shopping-cart/interface/cart.interface';
import { ShoppingCartActions, ShoppingCartCommonActions } from './cart.actions';

export const CART_FEATURE_KEY = 'shoppingCart';

export interface ShoppingCartState extends EntityState<CartItem> {
  totalPrice: number;
  totalQuantity: number;
}

export const selectShoppingCartState = createFeatureSelector<ShoppingCartState>(CART_FEATURE_KEY);

export const cartAdapter: EntityAdapter<CartItem> =
  createEntityAdapter<CartItem>({
    selectId: (item: CartItem) => item.id.toString(),
    sortComparer: false,
  });

const initialState: ShoppingCartState = cartAdapter.getInitialState({
  totalPrice: 0,
  totalQuantity: 0,
});

export const cartReducer = createReducer(
  initialState,
  on(ShoppingCartActions.addProduct, (state, { item }) => {
    let existingItem = state.entities[item.id];
    if (existingItem) {
      return cartAdapter.updateOne(
        {
          id: item.id,
          changes: { quantity: existingItem.quantity + 1 },
        },
        state
      );
    } else {
      return cartAdapter.addOne(item, state);
    }
  }),
  on(ShoppingCartActions.removeProduct, (state, { id }) => {
    return cartAdapter.removeOne(id, state);
  }),
  on(ShoppingCartActions.updateQuantity, (state, { id, changeInQuantity }) => {
    let existingItem = state.entities[id];
    if (existingItem) {
      let newQuantity = existingItem.quantity + changeInQuantity;
      if (newQuantity <= 0) {
        return cartAdapter.removeOne(id, state);
      } else {
        return cartAdapter.updateOne(
          {
            id: id,
            changes: { quantity: newQuantity },
          },
          state
        );
      }
    } else {
      return state;
    }
  }),

  on(ShoppingCartCommonActions.calculateTotalPrice, (state) => {
    let totalPrice = Object.values(state.entities).reduce((acc, item) => {
      return acc + item!.price * item!.quantity;
    }, 0);
    return { ...state, totalPrice: totalPrice };
  }),
  on(ShoppingCartCommonActions.calculateTotalQuantity, (state) => {
    let totalQuantity = Object.values(state.entities).reduce((acc, item) => {
      return acc + item!.quantity;
    }, 0);
    return { ...state, totalQuantity: totalQuantity };
  }),
  on(ShoppingCartCommonActions.clearShoppingCart, (state) => {
    return cartAdapter.removeAll({ ...state, totalPrice: 0 });
  }),
);

export const {
  selectAll: selectCartItems
} = cartAdapter.getSelectors(selectShoppingCartState);
