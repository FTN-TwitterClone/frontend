import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm = this.fb.group({
    username: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username != null) {
      this.profileService.forgotPassword(this.username).subscribe({
        complete: () => alert("An email has been sent to your email address."),
        error: err => this.errorHandlerService.alert(err)
      }
      )
    }
  }

  get username() {
    return this.resetPasswordForm.get('username')?.value
  }
}
