import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { validators } from 'src/app/components/validators/validator-variables';
import { User } from 'src/app/model/User.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInProgress: boolean = false
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
  constructor(private fb: FormBuilder,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private authService: AuthenticationService,
    private jwtUtilsService: JwtUtilsService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit(): void {

  }
  onSubmit() {
    this.loginInProgress = true
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'login', (token) => {
      if (this.loginForm.valid) {
        let loginCredentials = this.loginForm.value as User
        this.authService.login(loginCredentials, token).subscribe({
          next: res => {
            this.jwtUtilsService.setToken(res)
            alert("Successfully logged in")
            this.router.navigateByUrl("/home")
          },
          error: err => {
            this.errorHandlerService.alert(err)
            this.loginInProgress = false
          },
          complete: () => this.loginInProgress = false
        })
      }
    }, {
      useGlobalDomain: false
    });
  }

  get username() { return this.loginForm.get('username') }

  get password() { return this.loginForm.get('password') }
}
