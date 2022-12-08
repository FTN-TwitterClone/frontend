import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regularRegistration: boolean = true;
  registrationInProgress: boolean = false;
  constructor(private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  formToggle() {
    this.regularRegistration = !this.regularRegistration;
    this.toastrService.show(this.regularRegistration? 'You switched to regular user registration.':'You switched to business user registration.','Registration type changed')
  } 
  onRegistrationInProgress(registrationInProgress: boolean) {
    this.registrationInProgress = registrationInProgress
  }
}
