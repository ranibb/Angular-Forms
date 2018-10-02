import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registrationForm = new FormGroup({
    userName: new FormControl('Rani'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });

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
