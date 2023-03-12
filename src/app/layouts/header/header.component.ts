import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CartFacade } from '@shopping-cart/store/cart.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public screenWidth!: number;
  public cart$ = this.cartFacade.cartItems$;
  public totalQuantity$ = this.cartFacade.totalQuantity$;
  public totalPrice$ = this.cartFacade.totalPrice$;
  public itemsQuantity = 0;
  constructor(private cartFacade: CartFacade) {}


  ngOnInit() {
    this.totalQuantity$ = this.cartFacade.totalQuantity$;
    this.totalQuantity$.subscribe(quantity => this.itemsQuantity = quantity);
  }


  // @Input()
  // get cart(): ShoppingCartState {
  //   return this._cart;
  // }

  // set cart(cart: ShoppingCartState) {
  //   this._cart = cart;

  //   this.itemsQuantity = cart.shoppingCartList
  //     .map((item) => item.quantity)
  //     .reduce((prev, current) => prev + current, 0);
  // }

  // constructor(private cartService: CartService) {}
  // ngOnInit(): void {
  //   this.screenWidth = window.innerWidth;
  // }

  // getTotal(items: ReadonlyArray<CartItem>): number {
  //   return this.cartService.getTotal(items);
  // }

  onClearCart() {
    this.cartFacade.clearCart();
  }
}
