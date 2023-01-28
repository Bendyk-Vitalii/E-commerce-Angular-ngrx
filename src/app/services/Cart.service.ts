import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { Cart, CartItem } from '../pages/shopping-cart/cart.interface';
import { DEFAULT_DURATION } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<{ products: CartItem[] }>
  ) {}

  addToCart(item: CartItem) {
    const items: CartItem[] = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('1 item added to cart', 'Ok', { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared', 'Ok', {
      duration: 3000,
    });
  }

  removeFromCart(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item remove from cart', 'ok', {
      duration: 3000,
    });
  }

  removeQuantity(item: CartItem): void {
    let filteredItems: CartItem[];
    this.cart.value.items.map((_item, i, array) => {
      if ((_item.id = item.id)) {
        _item.quantity--;
        filteredItems = array;
        if (_item.quantity === 0) {
          this.removeFromCart(item);
        }
      }
    });

    this._snackBar.open('1 item remove from cart', 'ok', {
      duration: DEFAULT_DURATION,
    });
  }
}
