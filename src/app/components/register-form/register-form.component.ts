import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EGender } from 'src/app/model/EGender.model';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { BusinessUserRegister, RegularUserRegister } from 'src/app/model/User.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() registerationInProgressEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() regularRegistration: boolean = false
  enumGender: typeof EGender = EGender;
  businessUserRegisterForm = new FormBuilder().group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    website: ['', Validators.required],
    companyName: ['', Validators.required]
  })
  regularUserRegisterForm = new FormBuilder().group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    town: ['', Validators.required],
    gender: [EGender.MALE, Validators.required],
    age: [0, Validators.required]
  })
  constructor(private authService: AuthenticationService, private reCaptchaV3Service: ReCaptchaV3Service, private router: Router, private toastrService: ToastrService) { }

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
          this.toastrService.info("Please check your email, and confirm registration!")
          this.router.navigateByUrl("/login")
        },
        error: err => this.toastrService.error(err.error, 'Error'),
        complete: () => this.registerationInProgressEventEmitter.emit(false)
      })
    })
  }
  registerRegularUser() {
    this.reCaptchaV3Service.execute(`${environment.site_key}`, 'register', (token) => {
      let userToRegister = this.regularUserRegisterForm.value as RegularUserRegister;
      this.authService.registerRegularUser(userToRegister, token).subscribe({
        next: () => {
          this.toastrService.info("Please check your email, and confirm registration!");
          this.router.navigateByUrl("/login")
        },
        error: err => this.toastrService.error(err.error, 'Error'),
        complete: () => this.registerationInProgressEventEmitter.emit(false)
      })
    })
  }
  get usernameBusiness() { return this.businessUserRegisterForm.get('username') }
  get passwordBusiness() { return this.businessUserRegisterForm.get('password') }
  get emailBusiness() { return this.businessUserRegisterForm.get('email') }
  get websiteBusiness() { return this.businessUserRegisterForm.get('website') }
  get companyNameBusiness() { return this.businessUserRegisterForm.get('companyName') }

  get usernameRegular() { return this.regularUserRegisterForm.get('username') }
  get emailRegular() { return this.regularUserRegisterForm.get('email') }
  get firstnameRegular() { return this.regularUserRegisterForm.get('firstname') }
  get lastnameRegular() { return this.regularUserRegisterForm.get('lastname') }
  get townRegular() { return this.regularUserRegisterForm.get('town') }
  get passwordRegular() { return this.regularUserRegisterForm.get('password') }
  get ageRegular() { return this.regularUserRegisterForm.get('age') }
}
