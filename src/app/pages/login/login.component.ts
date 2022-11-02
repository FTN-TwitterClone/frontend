import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameMinLength:number = 5;
  passwordMinLength:number = 5;
  loginForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(this.usernameMinLength)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(this.passwordMinLength)
    ]]
  })
  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      let loginCredentials = this.loginForm.value as User
      this.authService.login(loginCredentials).subscribe(res => {
        console.log(res)
      })
    }
  }

  get username() { return this.loginForm.get('username') }

  get password() { return this.loginForm.get('password') }
}
