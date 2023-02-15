import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

import { environment } from 'src/environments/environment';
import { CartItem } from '../interface/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartApiService {
  constructor(private http: HttpClient) {}

  public Checkout(items: CartItem[]): void {
    this.http
      .post(environment.checkoutUrl, {
        items: items,
      })
      .subscribe(async (res: any) => {
        console.dir(res);
        let stripe = await loadStripe(environment.stripeApiKey);
        stripe?.redirectToCheckout({
          sessionId: res.id,
        })
      });
  }
}
