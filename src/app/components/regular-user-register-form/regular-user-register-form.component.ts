import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EGender } from 'src/app/model/EGender.model';
import { ERole } from 'src/app/model/ERole.model';
import { RegularUser } from 'src/app/model/RegularUser.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-regular-user-register-form',
  templateUrl: './regular-user-register-form.component.html',
  styleUrls: ['./regular-user-register-form.component.scss']
})
export class RegularUserRegisterFormComponent implements OnInit {
  enumGender: typeof EGender = EGender;
  regularUserRegisterForm = this.fb.group({
    username: [''],
    password: [''],
    firstname: [''],
    lastname: [''],
    age: [0],
    town: [''],
    gender: [EGender.OTHER],
    role: [ERole.REGULAR_USER],
    enabled: [true]
  })
  constructor(private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let userToRegister = this.regularUserRegisterForm.value as RegularUser;
    this.authService.register(userToRegister).subscribe(res => {
      console.log(res)
    })
  }
}
