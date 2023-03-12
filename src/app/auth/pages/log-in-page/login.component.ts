import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { forbiddenPasswordRegExp, signInValidationTypes } from '@auth/constants';
import { AuthFacade } from '@auth/store';
import { forbiddenValueValidator } from '@auth/utils/custom-validator/custom-validators.directive';
import { DEFAULT_DURATION } from '@shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public screenWidth!: number;
  private message!: string;
  private showLoginError$ = this.authFacade.hasLoginError$;
  public signInValidation = signInValidationTypes;
  public readonly form: FormGroup = this.formBuilder.group({
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

  constructor(
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  public submit(): void {
    this.authFacade.login(this.email.value, this.password.value);

    this.form.reset();

    this.showLoginError$.subscribe((hasError) => {
      hasError
        ? (this.message = ' Ooops! The login details are incorrect.')
        : (this.message = 'Log In Success');
    });

    this._snackBar.open(
      this.message,
      this.message === 'Log In Success' ? 'Ok' : 'Error',
      { duration: DEFAULT_DURATION }
    );
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
}
