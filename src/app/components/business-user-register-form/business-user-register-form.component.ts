import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BusinessUser } from 'src/app/model/BusinessUser.model';
import { EGender } from 'src/app/model/EGender.model';
import { validators } from 'src/app/components/validators/validator-variables';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment.prod';

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
  constructor(private authService: AuthenticationService,
    private fb: FormBuilder, private reCaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'register', (token) => {
      console.log('Token: ' + token)
      let userToRegister = this.businessUserRegisterForm.value as BusinessUser
      this.authService.registerBusinessUser(userToRegister).subscribe(res => {
        console.log(res)
      })
    })
  }
  get username() { return this.businessUserRegisterForm.get('username') }
  get password() { return this.businessUserRegisterForm.get('password') }
  get email() { return this.businessUserRegisterForm.get('email') }
}
