import { createActionGroup, props } from '@ngrx/store';

import { Product } from '@shared/product.interface';
import { CartItem } from '@pages/shopping-cart/cart.interface';

export enum ProductsActionTypes {
  GetSHCart = '[Home&Cart Page] Get Shopping Cart',
  AddToCart = '[Home&Cart Page] Add to Shopping Cart',
  ClearSHCart = '[Shopping Cart Page] Clear Shopping Cart',
  RemoveFromCart = '[Shopping Cart Page] Remove Product',
  IncreaseQuantity = '[Shopping Cart Page] Increase Quantity',
  DecreaseQuantity = '[Shopping Cart Page] Decrease Quantity',
}

export interface ISHCartList {
  items: ReadonlyArray<CartItem>;
}

export const SHCartActions = createActionGroup({
  source: '[Home&Cart Page]',
  events: {
    'Get Shopping Cart': props<ISHCartList>(),
    'Add to Shopping Cart': props<Product>(),
  },
});

export const SHCartUpdateActions = createActionGroup({
  source: '[Shopping Cart Page]',
  events: {
    'Clear Shopping Cart': props<any>(),
    'Remove Product': props<CartItem>(),
    'Increase Quantity': props<CartItem>(),
    'Decrease Quantity': props<CartItem>(),
  },
});
