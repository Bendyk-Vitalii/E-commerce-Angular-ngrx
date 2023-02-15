import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product } from '@shared/interface/product.interface';
import { CartItem } from '@pages/shopping-cart/cart.interface';

export interface ISHCartList {
  items: ReadonlyArray<CartItem>;
}

export const SHCartActions = createActionGroup({
  source: '[Home Page]',
  events: {
    'Get Shopping Cart': props<ISHCartList>(),
    'Select a Product': props<Product>(),
  },
});

export const SHCartUpdateActions = createActionGroup({
  source: '[Shopping Cart Page]',
  events: {
    'Clear Shopping Cart': emptyProps,
    'Remove Product': props<CartItem>(),
    'Increase Quantity': props<CartItem>(),
    'Decrease Quantity': props<CartItem>(),
  },
});
