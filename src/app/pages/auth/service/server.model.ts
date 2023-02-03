export interface AuthData {
  accessToken: string;
  /**
   * Admin ID in MySQL
   */
  id: number;
  iat: number;
  /**
   * Expiring at timestamp
   */
  exp: number;
}

export interface AuthSuccessResponseI {
  access_token: string;
}

export interface SignUpSuccessResponseI {
  name: null | string;
  email: string;
  lastLoginAt: null | Date;
  id: number;
}
