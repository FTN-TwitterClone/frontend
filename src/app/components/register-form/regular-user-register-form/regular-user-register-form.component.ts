import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EGender } from 'src/app/model/EGender.model';
import { validators } from 'src/app/components/validators/validator-variables';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment.prod';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { RegularUserRegister } from 'src/app/model/User.model';

@Component({
  selector: 'app-regular-user-register-form',
  templateUrl: './regular-user-register-form.component.html',
  styleUrls: ['./regular-user-register-form.component.scss']
})
export class RegularUserRegisterFormComponent implements OnInit {
  enumGender: typeof EGender = EGender
  @Output() registerationInProgressEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  regularUserRegisterForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    town: ['', Validators.required],
    gender: [EGender.MALE]
  })

  constructor(private authService: AuthenticationService,
    private fb: FormBuilder, private router: Router, private reCaptchaV3Service: ReCaptchaV3Service, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.passwordsEqual()) {
      alert('Passwords not equal')
      return
    }
    this.registerationInProgressEventEmitter.emit(true)
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'register', (token) => {
      let userToRegister = this.regularUserRegisterForm.value as RegularUserRegister;
      this.authService.registerRegularUser(userToRegister, token).subscribe({
        next: response => {
          console.log(response);
          alert("Please check your email, and confirm registration!");
          this.router.navigateByUrl("/login")
        },
        error: err => this.errorHandlerService.alert(err),
        complete: () => this.registerationInProgressEventEmitter.emit(false)
      })
    })
  }
  get username() { return this.regularUserRegisterForm.get('username') }
  get password() { return this.regularUserRegisterForm.get('password') }
  get repeatPassword() { return this.regularUserRegisterForm.get('repeatPassword') }
  get email() { return this.regularUserRegisterForm.get('email') }
  get age() { return this.regularUserRegisterForm.get('age') }
  passwordsEqual(): boolean {
    return this.password == this.repeatPassword
  }
}
