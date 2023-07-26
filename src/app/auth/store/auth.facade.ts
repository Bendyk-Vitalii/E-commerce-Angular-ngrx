import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CommonAuthActions, LoginActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { Credentials } from '@auth/interface';

@Injectable({providedIn: 'root'})
export class AuthFacade {
  auth$ = this.store.select(AuthSelectors.selectAuth);
  user$ = this.store.select(AuthSelectors.selectAuthUser);
  isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  hasLoginError$ = this.store.select(AuthSelectors.selectLoginError);

  constructor(private store: Store) {}

  login(credentials: Credentials) {
    const payload = { credentials };
    this.store.dispatch(LoginActions.logInRequest(payload));
  }

  logout() {
    this.store.dispatch(CommonAuthActions.userLogout());
  }

  getAuthUser() {
    this.store.dispatch(CommonAuthActions.getAuthUserRequest());
  }
}
