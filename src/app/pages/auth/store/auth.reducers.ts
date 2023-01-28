import { Action, createReducer, on } from '@ngrx/store';

import { LoginActions } from './auth.actions';
import { State, TokenStatus } from './auth.model';

export const AUTH_FEATURE_KEY = 'auth';

export const initialState: State = {
  isLoggedIn: false,
  user: undefined,
  accessTokenStatus: TokenStatus.PENDING,
  refreshTokenStatus: TokenStatus.PENDING,
  isLoadingLogin: false,
  hasLoginError: false,
};

const reducer = createReducer(
  initialState,
  on(LoginActions.logInRequest, (state): State => {
    return {
      ...state,
      accessTokenStatus: TokenStatus.VALIDATING,
      isLoadingLogin: true,
      hasLoginError: false,
    };
  }),
  on(LoginActions.userLogout, (): State => ({
    ...initialState,
  }))
);

export function authReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}

