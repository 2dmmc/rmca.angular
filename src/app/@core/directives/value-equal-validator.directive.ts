import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

export function valueEqualValidator(value: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (value === control.value) {
      return null;
    } else {
      return {
        isEqual: false,
      };
    }
  };
}

@Directive({
  selector: '[ngxValueEqualValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValueEqualValidatorDirective, multi: true}],
})
export class ValueEqualValidatorDirective implements Validator {
  @Input('value') value: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.value ? valueEqualValidator(this.value)(control)
      : null;
  }
}
