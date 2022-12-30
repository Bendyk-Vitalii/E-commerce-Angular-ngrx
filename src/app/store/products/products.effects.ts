import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ApiService } from './../../services/Api.service';

export const LOAD_PRODUCTS_TYPE = '[Products API] Retrieved Products List';
export const PRODUCTS_LOADED_SUCCESS = '[Products API] Loaded Success';
export const ERROR_LOAD_PRODUCTS_TYPE = '[Products API] Loaded Error';

export const LOAD_CATEGORIES_TYPE = '[Products API] Retrieved Categories List';
export const CATEGORIES_LOADED_SUCCESS = '[Products API] Loaded Success';
export const ERROR_LOAD_CATEGORIES_TYPE = '[Products API] Loaded Error';

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

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_CATEGORIES_TYPE),
      mergeMap(() =>
        this.apiService.getAllCategories().pipe(
          map((categories) => ({
            type: CATEGORIES_LOADED_SUCCESS,
            payload: categories,
          })),
          catchError(() => of({ type: ERROR_LOAD_CATEGORIES_TYPE }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
