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