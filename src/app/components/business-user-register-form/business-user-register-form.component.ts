import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BusinessUser } from 'src/app/model/BusinessUser.model';
import { EGender } from 'src/app/model/EGender.model';
import { ERole } from 'src/app/model/ERole.model';
import { User } from 'src/app/model/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-business-user-register-form',
  templateUrl: './business-user-register-form.component.html',
  styleUrls: ['./business-user-register-form.component.scss']
})
export class BusinessUserRegisterFormComponent implements OnInit {

  enumGender: typeof EGender = EGender;
  businessUserRegisterForm = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
    website: [''],
    companyName: [''],
    role: [ERole.BUSINESS_USER],
    enabled: [true]
  })
  constructor(private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let userToRegister = this.businessUserRegisterForm.value as BusinessUser
    this.authService.register(userToRegister as User).subscribe(res => {
      console.log(res)
    })
  }

}
