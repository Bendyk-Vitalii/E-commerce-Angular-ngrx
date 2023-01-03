import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Cart } from '../models/cart.model';
import { CartService } from '../services/Cart.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  cart: Cart = { items: [] };
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
