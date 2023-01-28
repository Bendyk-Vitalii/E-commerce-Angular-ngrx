import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '@core/store';
import { User } from './../auth.interface';
import { AuthSuccessResponseI } from './server.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const AUTH_API = 'http://localhost:3000/api/auth/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<UserModel>(null!);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private store: Store<AppState>
  ) {}

  logIn(credentials: { email: string; password: string }):Observable<AuthSuccessResponseI> {
    return this.http.post<AuthSuccessResponseI>(
      AUTH_API + 'login',
      credentials,
      httpOptions
    );
  }

  signUp(credentials: { email: string; password: string }):Observable<any> {
    return this.http.post(AUTH_API + 'register', {
    credentials,
    httpOptions
    });
  }

  public handleAuthentication(access_token: string) {
    const { email, exp, iat, id } =
      this.jwtHelperService.decodeToken(access_token);
    //const expirationDate = new Date(new Date().getTime() + exp);
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
    } = JSON.parse(userDataJson);1

    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    this.user.next(loadedUser);
    const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  public logout() {
    localStorage.removeItem('user');
    //this.store.
    this.user.next(null!);
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
