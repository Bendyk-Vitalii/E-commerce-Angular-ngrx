import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CartItem } from '@shopping-cart/interface/cart.interface';

export const ShoppingCartCommonActions = createActionGroup({
  source: 'Home Page',
  events: {
    'Get Shopping Cart': emptyProps,
    'Set Shopping Cart': props<{ shoppingCartList: ReadonlyArray<CartItem> }>(),
    'Calculate Total Price': emptyProps,
    'Calculate Total Quantity': emptyProps,
    'Clear Shopping Cart': emptyProps,
  },
});

export const ShoppingCartActions = createActionGroup({
  source: 'Shopping Cart',
  events: {
    'Add Product': props<{ item: CartItem }>(),
    'Remove Product': props<{ id: number }>(),
    'Update Quantity':  props<{ id: number, changeInQuantity: number }>(),
    'Increase Quantity': props<{  id: number }>(),
    'Decrease Quantity': props<{ item: CartItem }>(),
    'Load Colection Success': props<{items: CartItem[]}>(),
    'Success': props<CartItem>(),
    'Failure': props<{ error: any }>(),
  },
});
