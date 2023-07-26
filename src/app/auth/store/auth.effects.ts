import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, tap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import {
  CommonAuthActions,
  LoginActions,
  RefreshTokenActions,
} from './auth.actions';
import { AuthService } from '@auth/services/auth.service';
import { TokenStorageService } from '@auth/services/token-storage.service';


@Injectable()
export class AuthEffects {
  login$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logInRequest),
      exhaustMap((action) =>
        this.authService
          .logIn(action.credentials)
          .pipe(
            map(({access_token}) => LoginActions.logInSuccess({ access_token})),
            catchError((error) =>
              of(LoginActions.logInFailure({ error }))
            )
          )
      )
    );
  });

  onLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logInSuccess),
      map((access_token) => {
        this.authService.tokenHandler(access_token);
        // redirect to return url or home
        this.router.navigateByUrl(
          this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home'
        );
        return CommonAuthActions.getAuthUserRequest();
      })
    );
  },  { dispatch: false });

  // refreshToken$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(RefreshTokenActions.request),
  //     exhaustMap(() => {
  //       this.authService.refreshToken(user).pipe(
  //         map((data) => {
  //           // save tokens
  //           this.tokenStorageService.saveTokens(data.access_token);
  //           // trigger refresh token success action
  //           return RefreshTokenActions.success();
  //         }),
  //         catchError(() => of(RefreshTokenActions.failure()))
  //       );
  //     })
  //   );
  // });

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

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CommonAuthActions.userLogout),
        tap(() => {
          this.router.navigateByUrl('/home');
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
