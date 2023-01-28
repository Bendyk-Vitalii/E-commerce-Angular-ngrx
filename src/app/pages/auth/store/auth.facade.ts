import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { LoginActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  auth$ = this.store.select(AuthSelectors.selectAuth);
  user$ = this.store.select(AuthSelectors.selectAuthUser);
  isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  isLoadingLogin$ = this.store.select(AuthSelectors.selectIsLoadingLogin);
  hasLoginError$ = this.store.select(AuthSelectors.selectLoginError);

  constructor(private store: Store) {}

  login(email: string, password: string) {
    this.store.dispatch(AuthActions.LoginActions.logInRequest({ email, password }));
  }

  logout() {
    this.store.dispatch(AuthActions.LoginActions.userLogout());
  }

  getAuthUser() {
    this.store.dispatch(AuthActions.LoginActions.getAuthUserRequest());
  }
}