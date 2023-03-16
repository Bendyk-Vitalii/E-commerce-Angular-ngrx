import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartItem } from '@shopping-cart/interface/cart.interface';
import { CartFacade } from '@shopping-cart/store/cart.facade';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public screenWidth!: number;
  public totalQuantity$ = this.cartFacade.totalQuantity$;
  public totalPrice$ = this.cartFacade.totalPrice$;
  public itemsQuantity = 0;
  public cart$ = this.cartFacade.cartItems$;

  constructor(private cartFacade: CartFacade) {}


  ngOnInit() {
    this.cart$.subscribe(items => console.dir(items))
    this.totalQuantity$.subscribe((quantity: number) => this.itemsQuantity = quantity);
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

  onClearCart() {
    this.cartFacade.clearCart();
  }
}
