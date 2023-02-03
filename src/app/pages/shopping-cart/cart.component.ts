import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

import { STRIPE_API_KEY } from '@shared';
import { CartService } from '@services';
import { Cart, CartItem } from './cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cart!: Cart;
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    if (this.cart?.items) {
      this.http
        .post('http://localhost:4242/checkout', {
          items: this.cart.items,
        })
        .subscribe(async (res: any) => {
          console.dir(res);
          let stripe = await loadStripe(STRIPE_API_KEY);
          stripe?.redirectToCheckout({
            sessionId: res.id,
          });
        });
    } else {
      return;
    }
  }
}
