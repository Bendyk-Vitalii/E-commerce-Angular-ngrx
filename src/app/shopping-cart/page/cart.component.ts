import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { ShoppingCartApiService } from '@shopping-cart/service/CartApi.service';

import { CartFacade } from '@shopping-cart/store/cart.facade';
import { CartItem } from '../interface/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  public cart$ = this.cartFacade.cartItems$;
  public totalPrice$ = this.cartFacade.totalPrice$;
  public totalQuantity$ = this.cartFacade.totalQuantity$;

  dataSource!: Dictionary<CartItem> | null;

  constructor(
    private cartFacade: CartFacade,
    private apiService: ShoppingCartApiService
  ) {}

  public trackByFn(id: number): number {
    return id;
  }

  public onClearCart(): void {
    this.cartFacade.clearCart();
  }

  public onIncreaseQuantity(item: CartItem): void {
    this.cartFacade.addItem(item);
  }

  public onDecreaseQuantity(item: CartItem): void {
    this.cartFacade.removeItem(item.id);
  }

  public onCheckout(cartItems: CartItem[]): void {
    cartItems ? this.apiService.Checkout(cartItems) : null;
  }
}
