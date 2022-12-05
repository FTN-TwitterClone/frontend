import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BusinessUser, User } from 'src/app/model/User.model';
import { EGender } from 'src/app/model/EGender.model';
import { validators } from 'src/app/components/validators/validator-variables';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

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
    private fb: FormBuilder, private reCaptchaV3Service: ReCaptchaV3Service, private router: Router, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'register', (token) => {
      let userToRegister = this.businessUserRegisterForm.value as BusinessUser
      this.authService.registerBusinessUser(userToRegister, token).subscribe({
        next: () => {
          alert("Please check your email, and confirm registration!")
          this.router.navigateByUrl("/login")
        },
        error: err => this.errorHandlerService.alert(err)
      })
    })
  }
  get username() { return this.businessUserRegisterForm.get('username') }
  get password() { return this.businessUserRegisterForm.get('password') }
  get email() { return this.businessUserRegisterForm.get('email') }
}
