import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DEFAULT_DURATION } from '@shared/constants';
import { AuthService } from '@auth/services/auth.service';
import {
  forbiddenLoginValue,
  forbiddenPasswordRegExp,
  registrationValidationTypes,
} from '@auth/constants';
import { confirmPasswordValidator } from '@auth/utils/custom-validator/confirm-password.directive';
import { forbiddenValueValidator } from '@auth/utils/custom-validator/custom-validators.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  public message: string | undefined;
  public ValidationTypes = registrationValidationTypes;
  public readonly form: FormGroup = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.minLength(4),
          Validators.required,
          forbiddenValueValidator(forbiddenLoginValue),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          forbiddenValueValidator(forbiddenPasswordRegExp),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword'),
    }
  );

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    const { email, password, name } = this.form.value;
    this.authService.signUp({ email, password, name }).subscribe({
      next: () => {
        this.router.navigate(['auth/login']);
      },
      error: (err: { message: string | undefined }) => {
        !!err.message
          ? this._snackBar.open(err.message, 'Error', {
              duration: DEFAULT_DURATION,
            })
          : console.dir(err);
      },
    });
    this.form.reset();
  }

  get name() {
    return this.form.get('name')!;
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
