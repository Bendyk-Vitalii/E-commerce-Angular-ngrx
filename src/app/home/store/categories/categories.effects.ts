import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';

import { ApiService } from '@shared/services';
import { CategoriesActions } from './categories.action';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.categoriesListRequest),
      exhaustMap(() =>
        this.apiService.getCategories().pipe(
          map((categories) => CategoriesActions.loadedSuccess({ categories })),
          catchError(async ({error}) => CategoriesActions.loadedError(error) )
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
