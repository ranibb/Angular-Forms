import { Component } from '@angular/core';
import { User } from "./user";
import { EnrollmentService } from './enrollment.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  topics = ['Angular', 'React', 'Vue'];

  topicHasError = true;

  userModel = new User('', 'rob@test.com', 555666777, 'default', 'morning', true);

  constructor(private _enrollmentService: EnrollmentService) {}

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    this._enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log("Success", data),
        error => console.log("Error", error)
      )
  }
}
