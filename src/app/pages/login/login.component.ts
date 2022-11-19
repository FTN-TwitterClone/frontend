import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { validators } from 'src/app/components/validators/validator-variables';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(validators.username.minLength)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(validators.password.minLength)
    ]]
  })
  constructor(private fb: FormBuilder, private reCaptchaV3Service: ReCaptchaV3Service,private authService: AuthenticationService, private jwtUtilsService: JwtUtilsService, private router: Router) {
  }

  ngOnInit(): void {

  }
  onSubmit() {
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'login', (token) => {
      if (this.loginForm.valid) {
        let loginCredentials = {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
          captchaToken: token
        }
        this.authService.login(loginCredentials).subscribe(
          (res) => {
            this.jwtUtilsService.setToken(res)
            alert("Successfully logged in")
            this.router.navigateByUrl("/home")
          },
          (error) => {
            alert(error.error)
          })
      }
    }, {
        useGlobalDomain: false
    });
  }

  get username() { return this.loginForm.get('username') }

  get password() { return this.loginForm.get('password') }
}
