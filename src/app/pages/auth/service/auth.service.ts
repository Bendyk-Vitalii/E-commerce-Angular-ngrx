import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, tap, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from './user.model';
import { AuthServerResponse } from './server.model';
import { FormGroup } from '@angular/forms';

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
    private jwtHelperService: JwtHelperService
  ) {}

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthServerResponse>(AUTH_API + 'login', credentials, httpOptions)
      .pipe(
        catchError(this.handleError),
        tap((res: AuthServerResponse) =>
          this.handleAuthentication(res.access_token)
        )
      );
  }

  register({ login, email, password }: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        login,
        email,
        password,
      },
      httpOptions
    );
  }

  public handleAuthentication(access_token: string) {
    const { email, exp, iat, id } =
      this.jwtHelperService.decodeToken(access_token);
    const expirationDate = new Date(new Date().getTime() + exp);
    const user = new UserModel(email, id, access_token, expirationDate, iat);
    this.user.next(user);
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

  private handleError(errorRes: HttpErrorResponse) {
    let errorCount = 0;
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => {
        const error: any = new Error(`This is error number ${++errorCount}`);
        error.timestamp = Date.now();
        return error;
      });
    }
    switch (errorRes.error.error.message) {
      case 'CONFLICT':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => errorMessage);
  }
}
