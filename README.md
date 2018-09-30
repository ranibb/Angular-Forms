# Angular Forms

The concept behind angular forms is pretty straight forward. The component template contains the HTML to collect the user data. The component class handles data binding. The collected data is sent to the server through a service.

To achieve this, angular provide us with two approaches: The first: Template Driven Forms (Heavy on the component template; most of the code is written in the component template), The Second: Reactive Forms/model-driven Forms (Heavy on the component class; most of the code is written in the component class).

## Template Driven Forms (TDF)

We relay on Two-Way data binding with ngModel where we don’t have to keep track of the input filed values and react to change in the input field values. As a result, we will have bulky HTML and minimal component code. With ngForms along with ngModel, angular automatically track the form and form elements state and validity.

A drawback of the TDF approach is when it comes to Unit testing. The form validation logic can not be Unit tested. The only way to test the logic is to run an e2e test with a browser.

A second drawback is when it comes to handling complex forms. As we add more and more validations to a field or when we start adding complex cross-filed validations, the readability of the form decreases to a great extent.

So, the question is when should you go with the TDF approach? If you have to create a simple form for which unit testing can be handled with the browser, go with the TDF approach. For more complex forms with complex validations and where Unit testing is absolutely necessary, go with reactive forms.

## Reactive Forms

* Code and the logic reside in the component class
* No two-way binding, instead as the name suggests, we need to react to user input to update the values. Angular provide methods to update the FormControl values from the component class.
* Well suited for complex scenarios such as dynamic fields. For example, beginning the form with a single field allowing the user to enter their phone number but also give them the option to add additional fields such as alternate phone numbers. That is dynamic form elements.
* Custom validation
* Dynamic validation
* Reactive forms make it possible to unit test since the logic in the TypeScript file in the component class.

### A workflow
* CLI generated project
* Add the HTML that represent the form
* create the form model using the FormGroup and FormControl classes
* Manage the form control values
* Form builder service, which is a simpler way to specify a form model
* Validations - Simple, Custom, Cross-field and Dynamic
* Dynamic form controls
* Submitting form data to a server.