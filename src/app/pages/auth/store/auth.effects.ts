import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginActions } from './auth.actions';
import { AuthService } from '../service/auth.service';
import { User } from '../auth.interface';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logInRequest),
      exhaustMap(({ email, password }) =>
        this.authService.logIn({ email, password }).pipe(
          map(({ access_token }) => {
            this.tokenStorageService.saveTokens(access_token);
            this.authService.handleAuthentication(access_token);
            return LoginActions.logInSuccess()
          })
        )
      )
    );
  });

  onLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logInSuccess),
      map(() => {
        // redirect to return url or home
        this.router.navigateByUrl(
          this.activatedRoute.snapshot.queryParams['returnUrl'] || '/'
        );
        return LoginActions.getAuthUserRequest();
      })
    );
  });


  // loginComplete$ = createEffect(
  //   () => {}
  // )

  // logout$ = createEffect(
  //   (isAuthenticated: boolean) =>
  //     this.actions$.pipe(
  //       ofType(LoginActions.userLogout),
  //       tap(() => {
  //         this.authService.logout()

  //         this.router.navigateByUrl('/login');
  //         return isAuthenticated = false
  //       })
  //     ),
  // );

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}
}
