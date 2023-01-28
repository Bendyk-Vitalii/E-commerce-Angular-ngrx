import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  public form!: FormGroup;
  public message: string | undefined;
  public screenWidth!: number;
  public ValidationTypes = registrationValidationTypes;
  private isSuccessful = false;
  private isSignUpFailed = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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
    const { userName, email, password } = this.form.value;

    this.authService.register({ email, password, userName }).subscribe({
      next: (data) => {
        this.message = 'Registration successful';
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.message = err.message;
        this.isSignUpFailed = true;
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
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    console.dir(this.form);
  }
}
