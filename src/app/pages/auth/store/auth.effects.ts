import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CommonAuthActions,
  LoginActions,
  RefreshTokenActions,
} from './auth.actions';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logInRequest),
      exhaustMap(({ email, password }) =>
        this.authService.logIn({ email, password }).pipe(
          map(({access_token}) => {
            this.tokenStorageService.saveAccessToken(access_token)
            return LoginActions.logInSuccess({access_token});
          })
        )
      )
    );
  });

  onLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logInSuccess),
      map((access_token) => {
        this.authService.tokenHandler(access_token)
        // redirect to return url or home
        this.router.navigateByUrl(
          this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home'
        );
        return CommonAuthActions.getAuthUserRequest();
      })
    );
  });

  onLoginOrRefreshTokenFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.logInFailure, RefreshTokenActions.failure),
        tap(() => {
          this.tokenStorageService.removeTokens();
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}
}
