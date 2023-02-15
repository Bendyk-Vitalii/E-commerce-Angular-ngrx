import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cart, CartItem } from '@shopping-cart/interface/cart.interface';
import { CartService } from '@shopping-cart/service/Cart.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  public screenWidth!: number;
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }
}
