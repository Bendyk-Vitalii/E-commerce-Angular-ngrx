import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@shared';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/log-in-page';
import { SignupComponent } from './pages/sign-up-page';
import { authReducer, AUTH_FEATURE_KEY } from './store/auth.reducers';
import { AuthEffects } from './store/auth.effects';
import { AuthFacade } from './store/auth.facade';
import { AuthRouteEnum } from './enums';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: AuthRouteEnum.login, component: LoginComponent },
      {
        path: AuthRouteEnum.signup,
        component: SignupComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthFacade,
    AuthService,
  ],
})
export class AuthModule {}
