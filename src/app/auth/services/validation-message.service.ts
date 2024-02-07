import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationMessageService {
  public readonly emailValidationMessages: { [key: string]: string } = {
    required: 'Email is required.',
    email: 'Please enter a valid email address.',
  };

  public readonly passwordValidationMessages: { [key: string]: string } = {
    required: 'Password is required.',
    minLength: 'Password must be at least 6 characters long.',
    forbiddenValue: 'Password contains forbidden characters.',
  };
}
