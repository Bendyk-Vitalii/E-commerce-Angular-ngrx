import { User } from "@auth/interface";

export enum TokenStatus {
    PENDING = 'PENDING',
    VALIDATING = 'VALIDATING',
    VALID = 'VALID',
    INVALID = 'INVALID',
  }

  export interface AuthState {
    isLoggedIn: boolean;
    user?: User;
    accessTokenStatus: TokenStatus;
    refreshTokenStatus: TokenStatus;
    hasLoginError: boolean;
  }

  export interface AuthUser {
    id: number;
    firstName: string;
    lastName: string;
  }
