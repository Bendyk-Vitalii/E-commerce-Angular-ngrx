import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cart } from '@pages/shopping-cart/cart.interface';
import { CartService } from '@services';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
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
