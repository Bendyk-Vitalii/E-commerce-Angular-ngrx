import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ApiService } from '@services';
import { CategoriesActions, CategoriesActionTypes } from './categories.action';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActionTypes.LOAD),
      mergeMap(() =>
        this.apiService.getCategories().pipe(
          map((categories) => CategoriesActions.loadedSuccess({ categories })),
          catchError(() => of({ type: CategoriesActionTypes.LOAD_ERROR }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
