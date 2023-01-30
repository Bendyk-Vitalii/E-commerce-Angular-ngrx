import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  forbiddenLoginValue,
  forbiddenPasswordRegExp,
  registrationValidationTypes,
} from '../constants';
import { confirmPasswordValidator } from '../helpers/confirm-password.directive';
import { AuthService } from '../service/auth.service';
import { forbiddenValueValidator } from '../helpers/custom-validators.directive';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_DURATION } from '@shared/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  public form!: FormGroup;
  public message: string | undefined;
  public ValidationTypes = registrationValidationTypes;

  constructor(

    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        userName: [
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
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    const { email, password, login  } = this.form.value;
    this.authService.signUp({ email, password, login }).subscribe({
      next: () => {
        this.router.navigate(['auth/login']);
      },
      error: (err: { message: string | undefined; }) => {
      !!err.message?  this._snackBar.open(err.message, 'Ok', { duration: DEFAULT_DURATION }) : console.dir(err)
      },
    });
    this.form.reset();
  }

  get userName() {
    return this.form.get('userName')!;
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
