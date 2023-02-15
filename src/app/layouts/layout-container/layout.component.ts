import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Cart } from '@shopping-cart/interface/cart.interface';
import { CartService } from '@shopping-cart/service/Cart.service';


@Component({
  selector: 'app-layout-container',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutContainerComponent implements OnInit {
  cart: Cart = { items: [] };
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
    });
  }
}
