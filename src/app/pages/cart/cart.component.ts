import { STRIPE_API_KEY } from './../../shared/constants';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/Cart/Cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { TitleStrategy } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'test',
        price: 1,
        quantity: 2,
        id: 3,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'test',
        price: 1,
        quantity: 3,
        id: 2,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'test',
        price: 1,
        quantity: 5,
        id: 1,
      },
    ],
  };
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
    this.dataSource = this.cart.items;

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
  }
}
