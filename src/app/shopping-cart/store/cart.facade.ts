import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShoppingCartActions, ShoppingCartCommonActions } from './cart.actions';
import { cartSelector, totalPriceSelector, totalQuantitySelector } from './cart.selectors';
import { selectCartEntities } from '.';
import { CartItem } from '@shopping-cart/interface/cart.interface';

@Injectable()
export class CartFacade {
  cartItems$: Observable<CartItem[]> = this.store.pipe(
    select(selectCartEntities),
    map((entities) => Array.isArray(entities) ? Object.values(entities): [])
  );

  totalPrice$: Observable<number> = this.store.pipe(select(totalPriceSelector));
  totalQuantity$: Observable<number> = this.store.pipe(select(totalQuantitySelector));

  constructor(private store: Store) {}

  addItemToCart(item: CartItem): void {
    this.store.dispatch(ShoppingCartActions.addProduct({ item }));
  }

  removeItemFromCart(id: number): void {
    this.store.dispatch(ShoppingCartActions.removeProduct({ id }));
  }

  updateCartItemQuantity(id: number, changeInQuantity: number): void {
    this.store.dispatch(
      ShoppingCartActions.updateQuantity({ id, changeInQuantity })
    );
  }

  clearCart(): void {
    this.store.dispatch(ShoppingCartCommonActions.clearShoppingCart());
  }

  isItemInCart(id: number): Observable<boolean> {
    return this.cartItems$.pipe(
      map(
        (items) => Array.isArray(items) && items.some((item) => item.id === id)
      )
    );
  }
}
