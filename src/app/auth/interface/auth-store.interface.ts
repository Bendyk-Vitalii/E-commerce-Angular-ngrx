import { TokenStatus } from '@auth/enums/token-status.enum';
import { User } from '@auth/interface';


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
