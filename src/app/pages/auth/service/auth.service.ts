import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { AppState } from '@core/store';
import { User } from './../auth.interface';
import { AuthSuccessResponseI, SignUpSuccessResponseI } from './server.model';
import { ConfigService } from './config.service';

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
    private configService: ConfigService,
    private jwtHelperService: JwtHelperService,
    private store: Store<AppState>
  ) {
    this.hostUrl = this.configService.getAuthAPIUrl();
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

  public handleAuthentication(access_token: string) {
    const { email, exp, iat, id } =
      this.jwtHelperService.decodeToken(access_token);
    const user: User = { email, id, exp, iat, access_token };
    this.autoLogout(exp * 10000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userDataJson = localStorage.getItem('userData');
    if (!userDataJson) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userDataJson);
    1;

    // const loadedUser = new UserModel(
    //   userData.email,
    //   userData.id,
    //   userData._token,
    //   new Date(userData._tokenExpirationDate)
    // );

    const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  public logout() {
    localStorage.removeItem('user');
    //this.store.

    this.router.navigate(['login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
