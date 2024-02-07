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
import { TokenStorageService } from './token-storage.service';
import { AuthState } from '@auth/interface/auth-store.interface';
import { Credentials, User } from '@auth/interface';
import { AuthFacade } from '@auth/store';
import { environment } from 'src/environments/environment';
import { TokenStatus } from '@auth/enums/token-status.enum';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private hostUrl = environment.authApiUrl;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private jwtHelperService: JwtHelperService,
    private store: Store,
    private authFacade: AuthFacade
  ) {}

    /**
   * Initialize the authentication service.
   * Dispatches refresh token request and returns the authentication state.
   */
  init(): Promise<AuthState> {
    this.store.dispatch(RefreshTokenActions.request());

    const authState$ = this.authFacade.auth$.pipe(
      filter(
        auth =>
          auth.refreshTokenStatus === TokenStatus.INVALID ||
          (auth.refreshTokenStatus === TokenStatus.VALID && !!auth.user)
      ),
      take(1)
    );

    return lastValueFrom(authState$);
  }

   /**
   * Logs in the user with provided credentials.
   * @param credentials User credentials (email and password).
   * @returns Observable containing authentication success response.
   */
  logIn(credentials: Credentials): Observable<AuthSuccessResponseI> {
    return this.http.post<AuthSuccessResponseI>(
      this.hostUrl + 'login',
      credentials,
      httpOptions
    );
  }

    /**
   * Refreshes the authentication token.
   * @param user User object containing authentication data.
   * @returns Observable containing the refresh token response.
   */
  refreshToken(user: User): Observable<any> {
    return this.http.post<any>(this.hostUrl + 'refresh', user, httpOptions);
  }
  
    /**
  * Signs up the user with provided credentials.
  * @param credentials User credentials (email and password).
  * @returns Observable containing the sign-up success response.
  */
  signUp(credentials: Credentials): Observable<SignUpSuccessResponseI> {
    return this.http.post<SignUpSuccessResponseI>(
      this.hostUrl + 'register',
      credentials,
      httpOptions
    );
  }

   /**
   * Handles the authentication token received from the server.
   * Saves the token to local storage and decodes user data from the token.
   * @param access_token Authentication token received from the server.
   */
  tokenHandler({ access_token }: { access_token: string }): void {
    this.tokenStorageService.saveTokens(access_token);
    const { email, exp, iat, id } =
      this.jwtHelperService.decodeToken(access_token);
    const user: User = { email, id, exp, iat, access_token };
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
