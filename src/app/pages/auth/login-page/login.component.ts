import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { forbiddenPasswordRegExp } from '../constants';
import { forbiddenValueValidator } from '../helpers/custom-validators.directive';
import { signInValidationTypes } from './../constants';
import { AuthFacade } from '../store/auth.facade';
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
  readonly form: FormGroup = this.formBuilder.group({
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
