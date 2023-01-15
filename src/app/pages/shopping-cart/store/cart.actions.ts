import { Product } from 'src/app/models/product.model';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { createActionGroup, props } from '@ngrx/store';

export enum ProductsActionTypes {
  GetSHCart = '[Home&Cart Page] Get Shopping Cart',
  AddToCart = '[Home&Cart Page] Add to Shopping Cart',
  RemoveFromCart = '[Shopping Cart Page] Remove from Shopping Cart',
  DeleteFromCart = '[Shopping Cart Page] Delete from Shopping Cart',
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
  events: {},
});
