import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CartItem } from '@shopping-cart/interface/cart.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

  addCartItem(item: CartItem): Observable<void> {
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex > -1) {
      this.cartItems[existingItemIndex].quantity += 1;
    } else {
      this.cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    return of();
  }

  removeCartItem(id: number): Observable<void> {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    return of();
  }

  updateCartItemQuantity(id: number, changeInQuantity: number): Observable<void> {
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.id === id);
    if (existingItemIndex > -1) {
      this.cartItems[existingItemIndex].quantity += changeInQuantity;
      // Remove item from cart if quantity becomes zero
      if (this.cartItems[existingItemIndex].quantity <= 0) {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== id);
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    return of();
  }

  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  clearCart(): Observable<void> {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    return of();
  }

  constructor() { }
}
