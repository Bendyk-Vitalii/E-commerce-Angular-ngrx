import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class SearchFormValidators {
  static searchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const fn = group!.get("search")!.value;

      return fn ? null : { invalidValue: true };
    };
  }
}
