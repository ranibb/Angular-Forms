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