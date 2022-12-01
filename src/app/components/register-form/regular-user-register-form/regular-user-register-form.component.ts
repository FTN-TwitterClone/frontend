import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EGender } from 'src/app/model/EGender.model';
import { validators } from 'src/app/components/validators/validator-variables';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-regular-user-register-form',
  templateUrl: './regular-user-register-form.component.html',
  styleUrls: ['./regular-user-register-form.component.scss']
})
export class RegularUserRegisterFormComponent implements OnInit {
  enumGender: typeof EGender = EGender;
  regularUserRegisterForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(validators.username.minLength)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(validators.password.minLength)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    firstname: [''],
    lastname: [''],
    town: [''],
    gender: [EGender.MALE]
  })
  constructor(private authService: AuthenticationService,
    private fb: FormBuilder, private router: Router, private reCaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'register', (token) => {
      let userToRegister = this.regularUserRegisterForm.value as User;
      this.authService.registerRegularUser(userToRegister, token).subscribe(res => {
        if (res == null) {
          alert("Please check your email, and confirm registration!")
          this.router.navigateByUrl("/login")
        }
      })
    })
  }
  get username() { return this.regularUserRegisterForm.get('username') }
  get password() { return this.regularUserRegisterForm.get('password') }
  get email() { return this.regularUserRegisterForm.get('email') }
  get age() { return this.regularUserRegisterForm.get('age') }
}
