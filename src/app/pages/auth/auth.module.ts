import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login-page/login.component';
import { RegistrationComponent } from './registration-page/registration.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
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
  declarations: [LoginComponent, RegistrationComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
