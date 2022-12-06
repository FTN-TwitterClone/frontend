import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EGender } from 'src/app/model/EGender.model';
import { validators } from 'src/app/components/validators/validator-variables';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { BusinessUserRegister } from 'src/app/model/User.model';

@Component({
  selector: 'app-business-user-register-form',
  templateUrl: './business-user-register-form.component.html',
  styleUrls: ['./business-user-register-form.component.scss']
})
export class BusinessUserRegisterFormComponent implements OnInit {
  @Output() registerationInProgressEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  enumGender: typeof EGender = EGender;
  businessUserRegisterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    website: ['', Validators.required],
    companyName: ['', Validators.required]
  })
  constructor(private authService: AuthenticationService,
    private fb: FormBuilder, private reCaptchaV3Service: ReCaptchaV3Service, private router: Router, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.passwordsEqual()) {
      alert('Passwords not equal')
      return
    }
    this.registerationInProgressEventEmitter.emit(true)
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
  get username() { return this.businessUserRegisterForm.get('username') }
  get password() { return this.businessUserRegisterForm.get('password') }
  get repeatPassword() { return this.businessUserRegisterForm.get('repeatPassword') }
  get email() { return this.businessUserRegisterForm.get('email') }

  passwordsEqual(): boolean {
    return this.password == this.repeatPassword
  }
}
