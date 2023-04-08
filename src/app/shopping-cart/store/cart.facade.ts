import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShoppingCartActions, ShoppingCartCommonActions } from './cart.actions';
import { totalPriceSelector, totalQuantitySelector } from './cart.selectors';
import { CartItem } from '@shopping-cart/interface/cart.interface';
import { selectCartItems } from './cart.reducers';

@Injectable()
export class CartFacade {
  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  totalPrice$: Observable<number> = this.store.pipe(select(totalPriceSelector));
  totalQuantity$: Observable<number> = this.store.pipe(
    select(totalQuantitySelector)
  );

  constructor(private store: Store) {}

  async addItem(item: CartItem): Promise<void> {
    await this.store.dispatch(ShoppingCartActions.addProduct({ item }));
    await this.updateTotal();
  }

  async decreaseQuantity(item: CartItem): Promise<void> {
    await this.store.dispatch(ShoppingCartActions.decreaseQuantity({ item }));
    await this.updateTotal();
  }

  async removeItem(id: number): Promise<void> {
    await this.store.dispatch(ShoppingCartActions.removeProduct({ id }));
    await this.updateTotal();
  }

  async updateItemQuantity(
    id: number,
    changeInQuantity: number
  ): Promise<void> {
    await this.store.dispatch(
      ShoppingCartActions.updateQuantity({ id, changeInQuantity })
    );
    await this.updateTotal();
  }

  updateTotal(): void {
    this.store.dispatch(ShoppingCartCommonActions.calculateTotalQuantity());
    this.store.dispatch(ShoppingCartCommonActions.calculateTotalPrice());
  }

  isItemInCart(id: number): Observable<boolean> {
    return this.cartItems$.pipe(
      map(
        (items) => Array.isArray(items) && items.some((item) => item.id === id)
      )
    );
  }

  clearCart(): void {
    this.store.dispatch(ShoppingCartCommonActions.clearShoppingCart());
    this.updateTotal()
  }
}
