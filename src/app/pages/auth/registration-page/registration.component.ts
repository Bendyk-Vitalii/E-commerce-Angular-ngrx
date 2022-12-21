import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// const registration = new FormGroup({
//   name: new FormControl('', { nonNullable: true }),
//   email: new FormControl('', { nonNullable: true }),
//   password: new FormControl('', { nonNullable: true }),
// });

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  public name = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit(): void {}

  public getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
