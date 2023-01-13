import { signInValidationTypes } from './../constants';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forbiddenPasswordRegExp } from '../constants';
import { AuthService } from '../service/auth.service';
import { forbiddenValueValidator } from '../helpers/custom-validators.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public screenWidth!: number;
  public form!: FormGroup;

  public signInValidation = signInValidationTypes;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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
    this.authService
      .login({
        email: this.email.value,
        password: this.password.value,
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

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
}
