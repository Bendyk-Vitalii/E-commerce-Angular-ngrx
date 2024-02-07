import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthFacade } from '@auth/store';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacadeSpy: jasmine.SpyObj<AuthFacade>;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authFacadeSpyObj = jasmine.createSpyObj('AuthFacade', [
      'login',
      'hasLoginError$',
    ]);
    const snackbarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: AuthFacade, useValue: authFacadeSpyObj },
        { provide: MatSnackBar, useValue: snackbarSpyObj },
      ],
    }).compileComponents();

    authFacadeSpy = TestBed.inject(AuthFacade) as jasmine.SpyObj<AuthFacade>;
    snackbarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on form submission', () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    const loginSpy = authFacadeSpy.login.and.stub();

    component.form.setValue(credentials);
    submitButton.click();

    expect(loginSpy).toHaveBeenCalledWith(credentials);
  });

  it('should display error message if login fails', () => {
    const errorMessage = 'Ooops! The login details are incorrect.';
    authFacadeSpy.hasLoginError$ = of(true);

    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    const snackbarOpenArgs = snackbarSpy.open.calls.argsFor(0);
    expect(snackbarOpenArgs[0]).toBe(errorMessage);
    expect(snackbarOpenArgs[1]).toBe('Error');
  });

  it('should display success message if login succeeds', () => {
    const successMessage = 'Log In Success';
    authFacadeSpy.hasLoginError$ = of(false);

    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    const snackbarOpenArgs = snackbarSpy.open.calls.argsFor(0);
    expect(snackbarOpenArgs[0]).toBe(successMessage);
    expect(snackbarOpenArgs[1]).toBe('Ok');
  });

  it('should display email validation message when email is invalid', () => {
    const emailInput = component.form.controls['email'];
    emailInput.setValue('invalid_email');
    emailInput.markAsDirty();

    fixture.detectChanges();

    const emailErrorMessage = fixture.debugElement
      .query(By.css('.mat-error'))
      .nativeElement.textContent.trim();
    expect(emailErrorMessage).toBe('Invalid email format');
  });

  it('should display password validation message when password is invalid', () => {
    const passwordInput = component.form.controls['password'];
    passwordInput.setValue('weak');
    passwordInput.markAsDirty();

    fixture.detectChanges();

    const passwordErrorMessage = fixture.debugElement
      .query(By.css('.mat-error'))
      .nativeElement.textContent.trim();
    expect(passwordErrorMessage).toBe(
      'Password must be at least 6 characters long'
    );
  });
});
