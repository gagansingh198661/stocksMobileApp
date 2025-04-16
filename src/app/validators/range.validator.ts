import { AbstractControl, ValidatorFn } from '@angular/forms';

export const rangeValidator: ValidatorFn = (control: AbstractControl) => {
  const from = control.get('from')?.value;
  const to = control.get('to')?.value;
    console.log(from);
    console.log(to);
  if (to < from) {
    console.log('rangeError');
    return { rangeError: true };
  }
  return null;
};