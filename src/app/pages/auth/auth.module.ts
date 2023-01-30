import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { SharedModule } from '@shared';
import { LoginComponent } from './login-page';
import { RegistrationComponent } from './registration-page';
import { StoreModule } from '@ngrx/store';
import { authReducer, AUTH_FEATURE_KEY } from './store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { AuthFacade } from './store/auth.facade';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
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
    AuthService
  ],
})
export class AuthModule {}
