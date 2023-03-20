import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import { ShoppingCartActions } from './cart.actions';
import { CartItem } from '@shopping-cart/interface/cart.interface';
import { CartService } from '@shopping-cart/service/Cart.service';

@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.addProduct),
      mergeMap(({ item }: { item: CartItem }) =>
        this.cartService
          .addCartItem(item)
          .pipe(
            map(() => ShoppingCartActions.increaseQuantity({ id: item.id }))
          )
      ),
    )
  );

  increaseQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.increaseQuantity),
      mergeMap(({ id }: { id: number }) =>
        this.cartService
          .updateCartItemQuantity(id, 1)
          .pipe(
            map(() =>
              ShoppingCartActions.updateQuantity({ id, changeInQuantity: 1 })
            )
          )
      ),
    )
  );

  decreaseQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.decreaseQuantity),
      mergeMap(({ id }: { id: number }) =>
        this.cartService
          .updateCartItemQuantity(id, -1)
          .pipe(
            map(() =>
              ShoppingCartActions.updateQuantity({ id, changeInQuantity: -1 })
            )
          )
      ),
    )
  );

  removeCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.removeProduct),
      mergeMap(({ id }: { id: number }) =>
        this.cartService
          .removeCartItem(id)
          .pipe(map(() => ShoppingCartActions.removeProduct({ id })))
      ),
    )
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
  ) {}
}
