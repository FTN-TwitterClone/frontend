import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { validators } from 'src/app/components/validators/validator-variables';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginCredentials = {
    username: '',
    password: ''
  }
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
  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginForm.value.username ? this.loginCredentials.username = this.loginForm.value.username : '';
      this.loginForm.value.password ? this.loginCredentials.password = this.loginForm.value.password : '';
      this.authService.login(this.loginCredentials).subscribe(
        (res) => {
          this.tokenService.saveToken(res)
        },
        (error) => {
          alert(error.error)
        })
    }
  }

  get username() { return this.loginForm.get('username') }

  get password() { return this.loginForm.get('password') }
}
