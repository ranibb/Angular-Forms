import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  get userName() {
    return this.registrationForm.get('userName')
  }

  constructor(private fb: FormBuilder) {}
  
  registrationForm = this.fb.group({
    userName: ['Rani', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
    password: ['test'],
    confirmPassword: ['test'],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  })

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
}
