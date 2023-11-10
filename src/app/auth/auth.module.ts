import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { SharedModule } from '@shared';
import { LoginComponent } from './pages/log-in-page';
import { SignupComponent } from './pages/sign-up-page';
import { authReducer, AUTH_FEATURE_KEY } from './store/auth.reducers';
import { AuthEffects } from './store/auth.effects';
import { AuthRouteEnum } from './enums';
import { LocalStorageService } from './services/local-storage.service';

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
    LocalStorageService
  ],
})
export class AuthModule {}
