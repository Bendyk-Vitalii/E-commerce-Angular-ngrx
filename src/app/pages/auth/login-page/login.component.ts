import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forbiddenPasswordRegExp } from '../constants';
import { AuthService } from '../service/auth.service';
import { forbiddenValueValidator } from '../service/custom-validators.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);

  public signInValidation = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long',
      },
      {
        type: 'forbiddenValue',
        message: `Password should have at least 1 uppercase letter, 1 lowercase letter,
      1 number and at least one of symbols !@#$%^&*`,
      },
    ],
  };

  constructor(
    private authService: AuthService,
    private router: Router,
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

  get emailInput() {
    return this.form.get('email')!;
  }

  get passwordInput() {
    return this.form.get('password')!;
  }

  public getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public submit(): void {
    this.authService
      .login({
        email: this.emailInput.value,
        password: this.passwordInput.value,
      })
      .subscribe({
        next: (authData) => {
          this.router.navigate(['homepage']);
        },
        error: (errorMessage) => {
          this.form.reset();
          this._snackBar.open(errorMessage, 'Error', { duration: 3000 });
        },
      });
  }
}
