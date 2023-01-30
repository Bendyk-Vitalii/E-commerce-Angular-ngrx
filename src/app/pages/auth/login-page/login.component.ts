import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { forbiddenPasswordRegExp } from '../constants';
import { forbiddenValueValidator } from '../helpers/custom-validators.directive';
import { User } from './../auth.interface';
import { signInValidationTypes } from './../constants';
import { AuthFacade } from '../store/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public screenWidth!: number;
  public form!: FormGroup;
  public user!: User;
  public signInValidation = signInValidationTypes;

  constructor(
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          forbiddenValueValidator(forbiddenPasswordRegExp),
        ],
      ],
    });
  }

  public submit(): void {
    this.authFacade.login(this.email.value, this.password.value);
    this.form.reset();
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
}
