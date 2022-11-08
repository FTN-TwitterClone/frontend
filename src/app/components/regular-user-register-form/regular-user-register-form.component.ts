import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EGender } from 'src/app/model/EGender.model';
import { RegularUser } from 'src/app/model/RegularUser.model';
import { AuthService } from 'src/app/services/auth.service';
import { validators } from 'src/app/components/validators/validator-variables';

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
    age: [0, [
      Validators.min(validators.age.min)
    ]],
    town: [''],
    gender: [EGender.OTHER]
  })
  constructor(private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let userToRegister = this.regularUserRegisterForm.value as RegularUser;
    this.authService.registerRegularUser(userToRegister).subscribe(res => {
      console.log(res)
    })
  }
  get username() { return this.regularUserRegisterForm.get('username') }
  get password() { return this.regularUserRegisterForm.get('password') }
  get email() { return this.regularUserRegisterForm.get('email') }
  get age() { return this.regularUserRegisterForm.get('age') }
}
