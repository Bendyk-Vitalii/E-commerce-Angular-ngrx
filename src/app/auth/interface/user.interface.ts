export class User {
  id?: string;
  email?: string;
  password?: string;
  access_token!: string;
  exp?: Date;
  iat?: number;
}

export interface Credentials {
  email: string;
  password: string;
  name?: string;
}
