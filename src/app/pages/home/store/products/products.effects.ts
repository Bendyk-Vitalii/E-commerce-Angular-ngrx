import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ApiService } from '@services';
import { ProductsActionTypes, ProductsApiActions } from './products.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionTypes.Load),
      mergeMap(({ count, sort, category }) =>
        this.apiService.getAll(count, sort, category).pipe(
          map((products) => ProductsApiActions.loadedSuccess({ products })),
          catchError(() => of({ type: ProductsActionTypes.LoadError }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
