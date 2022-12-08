import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/User.model';
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
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private fb: FormBuilder,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private authService: AuthenticationService,
    private jwtUtilsService: JwtUtilsService,
    private router: Router,
    private toastr: ToastrService) {
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
            this.toastr.success('You have been successfully logged in.', 'Success')
            this.router.navigateByUrl("/home")
          },
          error: err => {
            this.toastr.error(err.error, 'Error')
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
