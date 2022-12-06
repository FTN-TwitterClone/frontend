import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regularRegistration: boolean = true;
  registrationInProgress: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  formToggle() {
    this.regularRegistration = !this.regularRegistration;
  }
  onRegistrationInProgress(registrationInProgress: boolean) {
    this.registrationInProgress = registrationInProgress
  }
}
