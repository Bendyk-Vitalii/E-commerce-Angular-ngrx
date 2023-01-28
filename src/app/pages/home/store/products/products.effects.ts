import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map,  catchError, exhaustMap } from 'rxjs/operators';

import { ApiService } from '@services';
import { ProductsApiActions } from './products.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.retrievedProductsList),
      exhaustMap(({ count, sort, category }) =>
        this.apiService.getProducts(count, sort, category).pipe(
          map((products) => ProductsApiActions.loadedSuccess({ products })),
          catchError(async ({ error }) => ProductsApiActions.loadedError({ error }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
