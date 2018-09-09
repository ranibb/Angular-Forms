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