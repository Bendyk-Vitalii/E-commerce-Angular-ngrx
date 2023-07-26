import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';


import { LoginComponent } from './login.component';
import { AuthFacade } from '@auth/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacade: AuthFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthFacade, useValue: {attemptLogin: () => jasmine.createSpy()} },

        provideMockStore()
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authFacade = TestBed.inject(AuthFacade);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
})






