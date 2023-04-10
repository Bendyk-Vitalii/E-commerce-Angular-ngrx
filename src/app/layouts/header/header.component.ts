import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

import { MenuService } from '@shared/services/open-menu.service';
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
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(private cartFacade: CartFacade, private menuService: MenuService) {}


  ngOnInit() {
    this.totalQuantity$.subscribe((quantity: number) => this.itemsQuantity = quantity);
  }

  ngAfterViewInit() {
    this.menuService.setMenuTrigger(this.menuTrigger);
  }

  onClearCart() {
    this.cartFacade.clearCart();
  }
}
