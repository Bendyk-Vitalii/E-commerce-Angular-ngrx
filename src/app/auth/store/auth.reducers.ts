import { Action, createReducer, on } from '@ngrx/store';

import {
  CommonAuthActions,
  LoginActions,
  RefreshTokenActions,
} from './auth.actions';
import { TokenStatus } from '@auth/enums/token-status.enum';
import { AuthState } from '@auth/interface/auth-store.interface';

export const AUTH_FEATURE_KEY = 'auth';

export const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  accessTokenStatus: TokenStatus.PENDING,
  refreshTokenStatus: TokenStatus.PENDING,
  hasLoginError: false,
};

const reducer = createReducer(
  initialState,
  on(LoginActions.logInRequest, (state): AuthState => {
    return {
      ...state,
      isLoggedIn: true,
      accessTokenStatus: TokenStatus.VALID,
      refreshTokenStatus: TokenStatus.VALID,
    };
  }),
  on(
    LoginActions.logInFailure,
    RefreshTokenActions.failure,
    (state, action): AuthState => ({
      ...state,
      accessTokenStatus: TokenStatus.INVALID,
      refreshTokenStatus: TokenStatus.INVALID,
      hasLoginError:
        action.type === '[Log In Page] Log In Failure' && !!action.error,
    })
  ),
  on(
    CommonAuthActions.userLogout,
    (): AuthState => ({
      ...initialState,
    })
  )
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
