import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import {
  AuthSuccessResponseI,
  SignUpSuccessResponseI,
} from '../interface/server.interface';
import { RefreshTokenActions } from '@auth/store/auth.actions';
import * as AuthSelectors from '@auth/store/auth.selectors';
import { TokenStorageService } from './token-storage.service';
import { AuthState, TokenStatus } from '@auth/interface/auth-store.interface';
import { User } from '@auth/interface';
import { AuthModule } from '@auth/auth.module';
import { AuthFacade } from '@auth/store';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface Credentials {
  name?: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private hostUrl: string;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private jwtHelperService: JwtHelperService,
    private store: Store,
    private authFacade: AuthFacade
  ) {
    this.hostUrl = 'http://localhost:3000/'
  }

  init(): Promise<AuthState> {
    this.store.dispatch(RefreshTokenActions.request());

    const authState$ = this.authFacade.auth$.pipe(
      filter(
        (auth) =>
          auth.refreshTokenStatus === TokenStatus.INVALID ||
          (auth.refreshTokenStatus === TokenStatus.VALID && !!auth.user)
      ),
      take(1)
    );

    return lastValueFrom(authState$);
  }

  logIn(credentials: Credentials): Observable<AuthSuccessResponseI> {
    return this.http.post<AuthSuccessResponseI>(
      this.hostUrl + 'login',
      credentials,
      httpOptions
    );
  }

  refreshToken(user: User): Observable<any> {
    return this.http.post<any>(this.hostUrl + 'refresh', user, httpOptions);
  }

  signUp(credentials: Credentials): Observable<SignUpSuccessResponseI> {
    return this.http.post<SignUpSuccessResponseI>(
      this.hostUrl + 'register',
      credentials,
      httpOptions
    );
  }

  tokenHandler({ access_token }: any): void {
    this.tokenStorageService.saveTokens(access_token);
    const { email, exp, iat, id } =
      this.jwtHelperService.decodeToken(access_token);
    const user: User = { email, id, exp, iat, access_token };
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
