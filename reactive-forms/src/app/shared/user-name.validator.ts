import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

    /* test if the formControl value containes the string forbiddenName */
  
    const forbidden = forbiddenName.test(control.value); // true or false
  
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  }
  
}