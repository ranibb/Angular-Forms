## Capturing the form data so that we can submit It to the server (Data Binding)

Any time we use a form tag angular attaches an NG form directive to the form tag which gives us valuable information about that particular form. It tells what are the values of the different form controls are and whether the values are valid or invalid.

To get a hold of a reference to this ng form directive, we use a template reference variable; #userForm.

```HTML
<form #userForm="ngForm">
    //...
</form>
```
The ngForm directive exports itself as the string "ngForm" and by assigning it to a reference variable, we have a reference to the directive itself.

As mentioned already, the directive gives us access to the values of the form controls. It does so by using the value property and passing it through a json pipe. Now, in order to take a peek at the form control values we use interpolation. 

```HTML
{{ userForm.value | json }}
```

Next, to let angular track a form control in your HTML, we use the ngModel directive to the form controls we would like to track.

If ngModel is used within a form tag, either the name attribute must be set or the form control must be defined as 'standalone' in ngModelOptions. So, along with the ngModel directive the name attribute is very much necessary.

```HTML
<input type="text" class="form-control" name="userName" ngModel>
```

This way we are able to retrieve the different form control values by making use of ngForm and ngModel directives.

```JSON
{ 
    "userName": "Rani", 
    "email": "rs@rani.co", 
    "phone": "0536503426", 
    "topic": "Angular", 
    "timePreference": "morning", 
    "subscribe": true
}
```

In addition to ngModel, angular also provides the ngModelGroup directive if we would like to group together or create a subgroup within a form. For example, consider an address, which could have street, city, state and postal code. We can group these fields into an address object using the ng model group directive.

```JSON
{
    "address": {
        "street": "Dabab street",
        "city": "Riyadh",
        "state": "Outside USA and Canada",
        "postalCode": "11656"
    },
    "userName": "Rani",
    "email": "rs@rani.co",
    "phone": "0536503426",
    "topic": "Angular",
    "timePreference": "morning",
    "subscribe": true
}
```

To understand template-driven-forms, we really don't have to focus on the ngModelGroup directive.

Keep in mind, when it comes to data binding in template-driven-forms, we have three directives: ngForm, ngModel and ngModelGroup.

So, we are able to bind data using the ngModel directive and we can send this bound data to the server when required using `userForm.value`. Although this works completely fine, a better approach is to bind the data to a user-defined model and send that model data to the server.


## Binding Data to a Model

As users enter the form data we will capture the changes and update an instance of the model that can later be sent to the server.

The first step is to generate a model class by running the following command in the terminal: `ng generate class User` where user is the name of the model class. Then open the generated user.ts file and add the different properties of the User class.

Now that we have a model, the next step is to create an instance of this model in the AppComponent class. By having this instance of the model, it is now possible to bind the User model data to the form. A simple use case for this would be updating or editing data that is already saved.

Now that we have captured all the form data into a model which can now be sent to the server. However, before sending it to the server it is crucial to perform client-side validation and provide useful visual feedback to the user.

## Track control state and validity

| State                            | Class if true | Class if false |
| ---------------------------------|---------------|----------------|
| The control has been visited.    | ng-touched    | ng-untouched   |
| The control's value has changed. | ng-dirty      | ng-pristine    |
| The control's value is valid     | ng-valid      | ng-invalid     |

At any point in time, angular applies three classes to a form control based on its state.

When you load a form for the very first time you have not yet visited a form field. So, angular applies a class of ng-untouched. If you do visit the form control either by clicking or tapping and then navigating away from the form control, angular applies a class of ng touched. The key point here is that the class will change only on blur; you have to navigate away from the form control. So, if the form control has been visited. ng-touched class is applied, if not, ng-untouched class is going to be applied.

On similar lines angular also tracks if the value of the form control has changed or not. Again, when you load a form for the very first time, the value has not yet changed, so angular applies a class ng-pristine. If you do change the value of the form control, angular applies a class of ng-dirty. For example, when you start typing a value into the input field, the class changes from ng-pristine to ng-dirty.

And the final pair of classes is concerned with the validity of the form control. The form control's value is valid, ng-valid class is applied, if not, ng-invalid is applied. For example, if an input field contains the required attribute, it implies that a value has to be entered. If a value is missing, ng-invalid class is applied and when a value is entered, ng-valid class is going to be applied.

So, in order to display the classes being applied to an input filed we first add a reference variable to that input field, for example #name

```HTML
<input type="text" #name class="form-control" name="userName" [(ngModel)]="userModel.name">
```

Then, we bind to that input's class name property

```HTML
{{name.className}}
<!-- where name is the reference variable. -->
```

You can see that the classes being applied to the input element are displayed.; We have "form-control ng-untouched ng-pristine ng-valid".

As you can see, angular tries to help us out with form validation by applying the appropriate classes to the form controls. Although these classes can be used to provide visual feedback, angular also provides an alternative. For each of the classes, angular provides an associated property on the ngModel directive.

| Class         | Property       |
|---------------|----------------|
| ng-untouched  | untouched      |
| ng-touched    | touched        |
| ng-pristine   | pristine       |
| ng-dirty      | dirty          |
| ng-valid      | valid          |
| ng-invalid    | invalid        |

In order to get access to the ngModel properties, we simply create a reference to the ngModel directive. Right now, the #name reference variable points to the input element in the DOM. By assigning it a value of ngModel.

```HTML
<input type="text" #name="ngModel" class="form-control" name="userName" [(ngModel)]="userModel.name" required>
```

The reference variable #name now points to the ngModel of this particular form control. So, now we have a reference to ngModel, we can easily bind to the different properties. For example, `{{name.untouched}}` returns true when reloading the form. If you click inside and then blur, it changes to false.

## Validation with Visual Feedback

We make use of the ngModel properties coupled with class binding. For example: `[class.is-invalid]="name.invalid"` which says, apply the class is invalid when the name form control is invalid.

Assume a case where we have a form field that is initially empty, then the class invalid is going to be applied without any user interaction, which looks bad. So, in addition to checking if the form control is invalid, we also check if the user has visited that form control. Hence update the class binding as following: `[class.is-invalid]="name.invalid && name.touched"`

### Pattern matching validation

You can add any regular expression you want to and create a pattern that your form field must satisfy. For example, a password must be 8 to 15 characters with at least one special character. A pin code in a specific format, a phone number in a specific format, the possibilities are endless.

For example, let’s make sure the phone number is 10 digits. For that, we do the following: First, get a reference to thr ngModel directive; `#phone="ngModel"`. Second, Add the pattern attribute with the regular expression; `pattern="^\d{10}$"`. Finally, let's bind the invalid class; `[class.is-invalid]="name.invalid"`.

## Displaying Error Messages

You can display error messages according to a single and multiple validation.

If you want to go the extra mile with user experience and be spot-on with your error messages, use the errors property on the ngModel. For that, we use the ngIf directive along with the ngModel properties.

For single validation rules:
* create an element that contains the error message.
* Conditionally display the message based on the state of the form filed. 
* Apply the appropriate style to the error message. 

For multiple validation rules:
* Create a block that gets rendered only if the errors object is defined and the field is for example, invalid or visited.
* Within that block, create separate error messages based on the validation that is being applied. And that can be accessed using the errors property.

### Select control validation

Considering a case where the drop-down options are being populated from an API instead of a hard-coded array. And in the API for the default option, the value is set to default and not an empty string. For that we need custom validation for select control.

We are going to listen the "blur" and "change" events on the select control. In the event handler, we are going to check if the value is the default value. If it is we set an error flag to true. We use that error flag to conditionally apply classes and display the error message.

Now when these events occur, we want a method to be executed. Let's call it validateTopic method. To this method we pass in the value of the select control. Also, don't forget to remove the required attribute.

### Form validation

Whenever we add a form element in the HTML, angular automatically attaches the ngForm directive to the form tag. We can get a reference to that ngForm directive with the help of a template reference variable: `#userForm="ngForm"`. And for ngForm directive we have the same properties that the ngModel have. Therefore, we can bind for example: `{{userForm.form.valid}}` which returns true if all the fields within the form are validated or false if at least one field isn't valid.

This can be used to disable the submit button until the form is valid. To do this, add the disabled property to the button element and bind it to the invalid state of the form `[disabled]="userForm.form.invalid"`. Well this works fine if you don't have custom validations that ngForm is not tracking.

Take for example the custom validation we created for the select control. A couple of ways to handle this: 
* The first one, when the submit button is clicked, an event is fired, you can check the value of the field and then proceed with submitting the form.
* The second one, we can simply add the condition topicHasError that was defined for the custom validation on the select control. So, the submit button gets disabled when the user for is invalid or the topic field has an error.

## Submitting form data

The first step is to add the novalidate attribute on the form tag. This will prevent browser validation from kicking in when we click on the submit button.

The next step is to bind to the ngSubmit event which gets emitted when the submit button is clicked. We will assign a handler to it called onSubmit which we define in the AppComponent class.

To be able to send the data to a server, we need to make use of a service. So let's create a new service using the CLI: `ng g s enrollment` and implement it.