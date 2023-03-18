import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
    this.totalQuantity$.subscribe((quantity: number) => this.itemsQuantity = quantity);
  }

  onClearCart() {
    this.cartFacade.clearCart();
  }
}
