import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { validators } from 'src/app/components/validators/validator-variables';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { JwtUtilsService } from 'src/app/security/jwt-utils.service';

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
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private jwtUtilsService: JwtUtilsService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      let loginCredentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.authService.login(loginCredentials).subscribe(
        (res) => {
          this.authService.setToken(res) ? alert("Successfully logged in") : alert("Error: Not logged in")
          console.log(this.jwtUtilsService.getUsername())
          console.log(this.jwtUtilsService.getRole())
          console.log(this.jwtUtilsService.getExp())
        },
        (error) => {
          alert(error.error)
        })
    }
  }

  get username() { return this.loginForm.get('username') }

  get password() { return this.loginForm.get('password') }
}
