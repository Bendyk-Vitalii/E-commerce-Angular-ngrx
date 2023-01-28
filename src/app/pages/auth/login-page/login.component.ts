import { LoginActions } from './../store/auth.actions';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { forbiddenPasswordRegExp } from '../constants';
import { AuthService } from '../service/auth.service';
import { forbiddenValueValidator } from '../helpers/custom-validators.directive';
import { User } from './../auth.interface';
import { signInValidationTypes } from './../constants';
import { AppState } from '@core/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public screenWidth!: number;
  public form!: FormGroup;
  public user!: User;
  public signInValidation = signInValidationTypes;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
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
this.form.reset()
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
}
