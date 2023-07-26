// import { TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { Actions } from '@ngrx/effects';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { cold, hot } from 'jasmine-marbles';
// import { Observable, of } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';

// import { LoginActions } from './auth.actions';
// import { AuthEffects } from './auth.effects';
// import { AuthService } from '@auth/services';
// import { AuthSuccessResponseI, Credentials } from '@auth/interface';
// import { CommonAuthActions } from './auth.actions';

// describe('AuthEffects', () => {
//   let effects: AuthEffects;
//   let authService: any;
//   let actions$: Observable<any>;
//   let routerService: any;
//   let snackBar: any;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         AuthEffects,
//         {
//           provide: AuthService,
//           useValue: { login: jest.fn() },
//         },
//         provideMockActions(() => actions$),
//         {
//           provide: Router,
//           useValue: { navigate: jest.fn() },
//         },
//         {
//           provide: MatSnackBar,
//           useValue: {
//             open: jest.fn(),
//           },
//         },
//       ],
//     });

//     effects = TestBed.inject(AuthEffects);
//     authService = TestBed.inject(AuthService);
//     actions$ = TestBed.inject(Actions);
//     routerService = TestBed.inject(Router);
//     snackBar = TestBed.inject(MatSnackBar);

//     jest.spyOn(routerService, 'navigate');
//   });

//   describe('login$', () => {
//     it('should return an auth.loginSuccess action, with user information if login succeeds', () => {
//       const credentials: Credentials = {
//         email: 'test@mail',
//         password: 'erfefefefefe',
//         name: 'test',
//       };
//       const token = { access_token: 'eefde#@dsdfd' } as AuthSuccessResponseI;
//       const action = LoginActions.logInRequest({ credentials });
//       const completion = LoginActions.logInSuccess({
//         access_token: 'fvbfbfgd',
//       });

//       actions$ = hot('-a---', { a: action });
//       const response = cold('-a|', { a: token });
//       const expected = cold('--b', { b: completion });
//       authService.login = jest.fn(() => response);

//       expect(effects.login$).toBeObservable(expected);
//     });

//     it('should return a new auth.loginFailure if the login service throws', () => {
//       const credentials: Credentials = {
//         email: 'test@mail',
//         password: 'tytyt334$',
//         name: 'someOne',
//       };
//       const action = LoginActions.logInRequest({ credentials });
//       const completion = LoginActions.logInFailure({
//         error: { name: 'name', message: 'Invalid email or password' },
//       });
//       const error = { name: 'name', message: 'Invalid email or password' };

//       actions$ = hot('-a---', { a: action });
//       const response = cold('-#', {}, error);
//       const expected = cold('--b', { b: completion });
//       authService.login = jest.fn(() => response);

//       expect(effects.login$).toBeObservable(expected);
//     });
//   });

//   describe('loginSuccess$', () => {
//     it('should dispatch a RouterNavigation action', (done: any) => {
//       const action = LoginActions.logInSuccess({
//         access_token: 'eefde#@dsdfd',
//       });

//       actions$ = of(action);

//       effects.onLoginSuccess$.subscribe(() => {
//         expect(routerService.navigate).toHaveBeenCalledWith(['/']);
//         done();
//       });
//     });
//   });

//   it('should dispatch a RouterNavigation action when auth.logout is dispatched', (done: any) => {
//     const action = CommonAuthActions.userLogout();

//     actions$ = of(action);

//     effects.onLoginSuccess$.subscribe(() => {
//       expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
//       done();
//     });
//   });
// });
