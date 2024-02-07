import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';

import {
  forbiddenPasswordRegExp,
  signInValidationTypes,
} from '@auth/constants';
import { Credentials } from '@auth/interface';
import { ValidationMessageService } from '@auth/services/validation-message.service';
import { AuthFacade } from '@auth/store';
import { forbiddenValueValidator } from '@auth/utils/custom-validator/custom-validators.directive';
import { DEFAULT_DURATION } from '@shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private message!: string;
  private showLoginError$ = this.authFacade.hasLoginError$;
  public signInValidation = signInValidationTypes;

  @Output() submitted = new EventEmitter<Credentials>();

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
    private _snackBar: MatSnackBar,
    private validationMessagesService: ValidationMessageService
  ) {}

  public submit(): void {
    const credentials: Credentials = this.form.value;
    this.authFacade.login(credentials);
    this.form.reset();
    this.showLoginError$.subscribe(hasError => {
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

  // Helper method to retrieve validation messages for email
  getEmailValidationMessage(): string {
    const emailControl = this.email;
    if (emailControl) {
      const errors = emailControl.errors;

      if (errors) {
        const errorKey = Object.keys(errors)[0];
        return this.validationMessagesService.emailValidationMessages[errorKey];
      }
    }

    return '';
  }

  // Helper method to retrieve validation messages for password
  getPasswordValidationMessage(): string {
    if (this.password) {
      const errors = this.password.errors;

      if (errors) {
        const errorKey = Object.keys(errors)[0];
        return this.validationMessagesService.passwordValidationMessages[
          errorKey
        ];
      }
    }

    return '';
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
}
