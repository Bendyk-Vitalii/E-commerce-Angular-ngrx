import { CartService } from './services/Cart.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'amazing-shop';
  cart: Cart = { items: [] };
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
