import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BusinessUser } from 'src/app/model/BusinessUser.model';
import { EGender } from 'src/app/model/EGender.model';
import { ERole } from 'src/app/model/ERole.model';
import { AuthService } from 'src/app/services/auth.service';
import { validators } from 'src/app/components/validators/validator-variables';

@Component({
  selector: 'app-business-user-register-form',
  templateUrl: './business-user-register-form.component.html',
  styleUrls: ['./business-user-register-form.component.scss']
})
export class BusinessUserRegisterFormComponent implements OnInit {

  enumGender: typeof EGender = EGender;
  businessUserRegisterForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    username: ['', [
      Validators.required,
      Validators.minLength(validators.username.minLength)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(validators.password.minLength)
    ]],
    website: [''],
    companyName: ['']
  })
  constructor(private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let userToRegister = this.businessUserRegisterForm.value as BusinessUser
    this.authService.registerBusinessUser(userToRegister).subscribe(res => {
      console.log(res)
    })
  }
  get username() { return this.businessUserRegisterForm.get('username') }
  get password() { return this.businessUserRegisterForm.get('password') }
  get email() { return this.businessUserRegisterForm.get('email') }
}
