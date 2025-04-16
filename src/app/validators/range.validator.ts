import { AbstractControl, ValidatorFn } from '@angular/forms';

export const rangeValidator: ValidatorFn = (control: AbstractControl) => {
  const from = control.get('from')?.value;
  const to = control.get('to')?.value;
    if(to==''||from=='')
        return null;
  if (to < from) {
    console.log('rangeError');
    return { rangeError: 'From cannot be greater than To' };
  }
  return null;
};