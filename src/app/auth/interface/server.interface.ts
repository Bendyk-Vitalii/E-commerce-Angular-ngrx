export interface AuthData {
  accessToken: string;
  id: number;
  iat: number;
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
