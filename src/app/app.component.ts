import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  strongPassword = false;

  constructor(private signup: FormBuilder) { }

  signupForm = this.signup.group({
    password: new FormControl(null, [
      Validators.minLength(8),
    ]),
  });

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }
}
