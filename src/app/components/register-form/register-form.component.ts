import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EGender } from 'src/app/model/EGender.model';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { BusinessUserRegister, RegularUserRegister } from 'src/app/model/User.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() registerationInProgressEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() regularRegistration: boolean = false
  enumGender: typeof EGender = EGender;
  businessUserRegisterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    website: ['', Validators.required],
    companyName: ['', Validators.required]
  })
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
    private fb: FormBuilder, private reCaptchaV3Service: ReCaptchaV3Service, private router: Router, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.registerationInProgressEventEmitter.emit(true)
    if (this.regularRegistration) {
      this.registerRegularUser()
    } else {
      this.registerBusinessUser()
    }

  }
  registerBusinessUser() {
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'register', (token) => {
      let userToRegister = this.businessUserRegisterForm.value as BusinessUserRegister
      this.authService.registerBusinessUser(userToRegister, token).subscribe({
        next: () => {
          alert("Please check your email, and confirm registration!")
          this.router.navigateByUrl("/login")
        },
        error: err => this.errorHandlerService.alert(err),
        complete: () => this.registerationInProgressEventEmitter.emit(false)
      })
    })
  }
  registerRegularUser() {
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'register', (token) => {
      let userToRegister = this.regularUserRegisterForm.value as RegularUserRegister;
      this.authService.registerRegularUser(userToRegister, token).subscribe({
        next: () => {
          alert("Please check your email, and confirm registration!");
          this.router.navigateByUrl("/login")
        },
        error: err => this.errorHandlerService.alert(err),
        complete: () => this.registerationInProgressEventEmitter.emit(false)
      })
    })
  }
  get usernameBusiness() { return this.businessUserRegisterForm.get('username') }
  get passwordBusiness() { return this.businessUserRegisterForm.get('password') }
  get repeatPasswordBusiness() { return this.businessUserRegisterForm.get('repeatPassword') }
  get emailBusiness() { return this.businessUserRegisterForm.get('email') }
  get websiteBusiness() { return this.businessUserRegisterForm.get('website') }
  get companyNameBusiness() { return this.businessUserRegisterForm.get('companyName') }

  get usernameRegular() { return this.regularUserRegisterForm.get('username') }
  get emailRegular() { return this.regularUserRegisterForm.get('email') }
  get firstnameRegular() { return this.regularUserRegisterForm.get('firstname') }
  get lastnameRegular() { return this.regularUserRegisterForm.get('lastname') }
  get townRegular() { return this.regularUserRegisterForm.get('town') }
  get passwordRegular() { return this.regularUserRegisterForm.get('password') }
  get repeatPasswordRegular() { return this.regularUserRegisterForm.get('repeatPassword') }
}
