import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { AppState } from '@core/store';
import { User } from './../auth.interface';
import { AuthSuccessResponseI, SignUpSuccessResponseI } from './server.model';
import { ConfigService } from './config.service';
import { RefreshTokenActions } from '../store/auth.actions';
import * as AuthSelectors from '../store/auth.selectors'
import { AuthState, TokenStatus } from '../store/auth.model';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface CredentialsI {
  login?: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  private hostUrl: string;
  private clientId!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private configService: ConfigService,
    private jwtHelperService: JwtHelperService,
    private store: Store<AppState>
  ) {
    this.hostUrl = this.configService.getAuthAPIUrl();
  }

  init(): Promise<AuthState> {
    this.store.dispatch(RefreshTokenActions.request());

    const authState$ = this.store.select(AuthSelectors.selectAuth).pipe(
      filter(
               auth =>
          auth.refreshTokenStatus === TokenStatus.INVALID ||
          (auth.refreshTokenStatus === TokenStatus.VALID && !!auth.user)
      ),
      take(1)
    );

    return lastValueFrom(authState$);
  }

  logIn(credentials: {
    email: string;
    password: string;
  }): Observable<AuthSuccessResponseI> {
    return this.http.post<AuthSuccessResponseI>(
      this.hostUrl + 'login',
      credentials,
      httpOptions
    );
  }

  signUp(credentials: CredentialsI): Observable<SignUpSuccessResponseI> {
    return this.http.post<SignUpSuccessResponseI>(
      this.hostUrl + 'register',
      credentials,
      httpOptions
    );
  }

  tokenHandler({access_token}: any): void {

    this.tokenStorageService.saveTokens(access_token)
    const { email, exp, iat, id } =
      this.jwtHelperService.decodeToken(access_token);
    const user: User = { email, id, exp, iat, access_token };
    localStorage.setItem('userData', JSON.stringify(user));
    console.log(user)
  }

  logout(clients: 'all' | 'allButCurrent' | 'current' = 'current'): Observable<void> {
    const params = new HttpParams().append('clients', clients);

    return this.http.get<void>(`${this.hostUrl}/api/auth/logout`, { params });
  }
}
