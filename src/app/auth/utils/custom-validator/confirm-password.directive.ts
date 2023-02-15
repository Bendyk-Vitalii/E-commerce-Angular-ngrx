import { FormGroup } from '@angular/forms';

export function confirmPasswordValidator(
  controlName: string,
  matchesControlName: string
) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchesControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmPasswordValidator']
    ) {
      return null;
    }
    const passwordConfirmValid = control.value === matchingControl.value;
    return !passwordConfirmValid
      ? matchingControl.setErrors({ confirmPasswordValidator: true })
      : matchingControl.setErrors(null);
  };
}
