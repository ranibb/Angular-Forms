## Creating the Form Model

In our demo application, we have three form fields Username, Password and Confirm Password. Each of these form fields is defined as an instance of the *FormControl* class. And the overall form itself that encompasses the three form fields is defined as an instance of the *FormGroup* class.

So, first step is to create a new FormGroup instance in that represents the user registration form.

```TypeScript
registrationForm = new FormGroup();
```

The next step is to initialize this FormGroup with an object of controls that are present in the html. You can pass default value into the FormControl constructor. For example, 'Rani' to userName.

```TypeScript
registrationForm = new FormGroup({
    userName: new FormControl('Rani'),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
});
```

To associate this model with the view (the HTML form), the ReactiveFormsModule provides us with certain directives. On the form tag we use the `formGroup` directive and bind the registrationForm.

```TypeScript
<form [formGroup]="registrationForm">
```

To bind each of the Form Controls we use the `formControlName` directive.

```TypeScript
<input formControlName="userName" type="text" class="form-control">

<input formControlName="password" type="password" class="form-control">

<input formControlName="confirmPassword" type="password" class="form-control">
```

Now that we have established communication layer between the model and the view, let’s use interpolation with the JSON pipe.

```TypeScript
    {{registrationForm.value | json}}
```

This outputs the following object:

    { "userName": "Rani", "password": "", "confirmPassword": "" }

The values get updated as you type into the input fields. There you go! we have created our reactive form.

## Nesting FormGroups

The FormGroup class can also be used to group together different FormControls.

When building complex forms, managing the different areas of information is easier in smaller sections. In such scenarios, use a nested form group to break large forms into smaller and more manageable ones.

```JSON
{ 
    "userName": "Rani", 
    "password": "", 
    "confirmPassword": "", 
    "address": { 
        "city": "", 
        "state": "", 
        "postalCode": "" 
    }
}
```

## Managing Control Values

Let’s see how we can set form control values without any user interaction, that is setting values programmatically. For example, we might have to retrieve form data from a back-end API or service and update the form controls to their new values. We can do that using the setValue method provided by reactive forms.

```TypeScript
loadAPIData() {
    this.registrationForm.setValue({
        userName: 'Ahmad',
        password: 'test',
        confirmPassword: 'test',
        address: {
            city: 'city',
            state: 'State',
            postalCode: '123456'
        }
    })
}
```

Note that the setValue method is strict about maintaining the structure of the form group, you have to pass all the form control values.

If you do have to set values for only few of the fields, you can make use of the patchValue method.

```TypeScript
loadAPIData() {
    this.registrationForm.patchValue({
        userName: 'Ahmad',
        password: 'test',
        confirmPassword: 'test',
    })
}
```

## FormBuilder Service

We have seen so far how to create a form model using the FormGroup and the FormControl classes. But as you can see creating multiple FormControls instances manually can become very repetitive. To avoid this, angular provides the form builder service which in turn provides methods to handle generating FormControls with a lesser code.

## Simple Validation

The steps to implement a simple validation is as following:
1. Apply the validation rule to a form control.
2. Provide a visual feedback for the validation.
3. Display the appropriate error message for the validation.

A small tip; To keep the code short and simple, create a getter that returns a form control, and in the HTML, replace all occurrences with the getter.

## Custom Validation

A custom validator is a function that can be written into the component file it self. Since these validator functions are usually reused in several places in the applicationm it is always a good idea to create a seperate file and export them.

The validator function returns either of two values: When the validation fails it returns an object where the key is of type string and the value is of type any, and if the validation passed it returns null.

```TypeScript
export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {

  /* test if the formControl value containes the string "admin" */

  const forbidden = /admin/.test(control.value); // true or false

  return forbidden ? { 'forbiddenName': { value: control.value } } : null;

}
```

### Pass parameters to custom validators

For example, pass in the string we want to forbid as a parameter to our custom validator. However, the drawback of the validator function is that it can accept only one parameter which is the form control, so we can’t simply pass in a second parameter. Instead, what we have to do is create a factory function that accept a string as a parameter and return the validator function itself.

```TypeScript
export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

    /* test if the formControl value containes the string forbiddenName */
  
    const forbidden = forbiddenName.test(control.value); // true or false
  
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  }
  
}
```

## Cross Field Validation

Compare values across two different form controls to perform the necessary validation. For example, let's perform crossfield validation with the password and confirm password fields.

note: the control parameter does not refer to an individual form control. Instead, it refers to the form group encompassing the different fields being validated.

## Conditional Validation

## Dynamic Form Controls

The steps:
* Import FormArray
* Define a form Array
* Create a getter
* Create a method to push either a form control or a form group
* Add the form array name directive 
* Iterate using the ngFor structural directive.

## Submitting Form Data