import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';

import { CartFacade } from '@shopping-cart/store/cart.facade';
import { CartItem } from '../interface/cart.interface';
import { CartService } from '../service/Cart.service';
import { ShoppingCartApiService } from '../service/CartApi.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  public cart$ = this.cartFacade.cartItems$;
  public totalPrice$ = this.cartFacade.totalPrice$
  dataSource!: Dictionary<CartItem> | null;
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  constructor(
    private cartService: CartService,
    private cartFacade: CartFacade,
    private shoppingCartApiService: ShoppingCartApiService
  ) {}

  ngOnInit(): void {
    // this.cartService.cart.subscribe((_cart: ShoppingCartState) => {
    //   this.cart = _cart;
    //   this.dataSource = this.cart.shoppingCartList;
    // });
  }

  getTotal(items: ReadonlyArray<CartItem>): number {
    //return this.cartService.getTotal(items);
    return 1;
  }

  onClearCart(): void {
    this.cartFacade.clearCart();
    //this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartFacade.removeItemFromCart(item.id);
    // this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    //this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    //this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    // if (this.cart?.shoppingCartList) {
    //  // this.shoppingCartApiService.Checkout(this.cart?.shoppingCartList)
    // } else {
    //   return;
    // }
  }
}
