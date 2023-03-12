import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartFacade } from '@shopping-cart/store/cart.facade';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutContainerComponent {
  public cart$ = this.cartFacade.cartItems$;

  constructor(private cartFacade: CartFacade) {}
}
