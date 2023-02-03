import { Action, createReducer, on } from '@ngrx/store';

import { CommonAuthActions, LoginActions, RefreshTokenActions } from './auth.actions';
import { AuthState, TokenStatus } from './auth.model';

export const AUTH_FEATURE_KEY = 'auth';

export const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  accessTokenStatus: TokenStatus.PENDING,
  refreshTokenStatus: TokenStatus.PENDING,
  isLoadingLogin: false,
  hasLoginError: false,
};

const reducer = createReducer(
  initialState,
  on(LoginActions.logInRequest, (state): AuthState => {
    return {
      ...state,
      isLoggedIn: true,
      isLoadingLogin: false,
      accessTokenStatus: TokenStatus.VALID,
      refreshTokenStatus: TokenStatus.VALID,
    };
  }),
  on(
    LoginActions.logInFailure,
    RefreshTokenActions.failure,
    (state, action): AuthState => ({
      ...state,
      isLoadingLogin: false,
      accessTokenStatus: TokenStatus.INVALID,
      refreshTokenStatus: TokenStatus.INVALID,
      hasLoginError: action.type === "[Log In Page] Log In Failure" && !!action.error,
    })
  ),
  on(CommonAuthActions.userLogout, (): AuthState => ({
    ...initialState,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}

