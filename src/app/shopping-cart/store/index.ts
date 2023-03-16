// import {
//   createSelector,
//   createFeatureSelector,
//   ActionReducerMap,
// } from '@ngrx/store';
// import * as fromCart from './cart.reducers';

// export interface State {
//   cart: fromCart.ShoppingCartState;
// }

// export const cartReducers: ActionReducerMap<State> = {
//   cart: fromCart.cartReducer,
// };

// export const selectCartState = createFeatureSelector<fromCart.ShoppingCartState>('cart');

// // export const selectUserIds = createSelector(
// //   selectUserState,
// //   fromCart. // shorthand for usersState => fromUser.selectUserIds(usersState)
// // );
// export const selectCartEntities = createSelector(
//   selectCartState,
//   fromCart.selectCartEntities
// );
// // export const selectAllUsers = createSelector(
// //   selectUserState,
// //   fromCart.selectAllUsers
// // );
// // export const selectUserTotal = createSelector(
// //   selectUserState,
// //   fromCart.selectUserTotal
// // );
// // export const selectCurrentUserId = createSelector(
// //   selectUserState,
// //   fromCart.getSelectedCartId
// // );


