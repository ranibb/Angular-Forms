import { AbstractControl } from "@angular/forms";

export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {

  /* test if the formControl value containes the string "admin" */

  const forbidden = /admin/.test(control.value); // true or false

  return forbidden ? { 'forbiddenName': { value: control.value } } : null;

}