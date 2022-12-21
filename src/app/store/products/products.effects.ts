import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from './../../services/Api.service';

export const LOAD_PRODUCTS_TYPE = 'Products API Retrieved Products List';
export const PRODUCTS_LOADED_SUCCESS = 'Products API Products Loaded Success';
export const ERROR_LOAD_PRODUCTS_TYPE = 'Products API Products Loaded Error';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_PRODUCTS_TYPE),
      mergeMap(() =>
        this.apiService.getAll('12', 'desc').pipe(
          map((products) => ({
            type: PRODUCTS_LOADED_SUCCESS,
            payload: products,
          })),
          catchError(() => of({ type: ERROR_LOAD_PRODUCTS_TYPE }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
