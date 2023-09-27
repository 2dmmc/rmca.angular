import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

export function passwordEqualValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.parent) {
    const password = control.parent.value.password;
    const repeatPassword = control.value;

    if (repeatPassword !== '') {
      if (repeatPassword === password) {
        return null;
      } else {
        return {
          repeatPassword: true,
        };
      }
    }
  }
}

@Directive({
  selector: '[ngxPasswordEqualValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordEqualValidatorDirective, multi: true}],
})
export class PasswordEqualValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return passwordEqualValidator(control);
  }
}
