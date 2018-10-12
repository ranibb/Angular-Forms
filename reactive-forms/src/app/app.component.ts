import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private fb: FormBuilder) {}
  
  registrationForm = this.fb.group({
    userName: ['Rani', [Validators.required, Validators.minLength(3)]],
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
