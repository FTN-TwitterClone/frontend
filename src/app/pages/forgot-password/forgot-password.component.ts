import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm = new FormBuilder().group({
    username: ['', Validators.required]
  })
  constructor(
    private profileService: ProfileService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username != null) {
      this.profileService.forgotPassword(this.username).subscribe({
        complete: () => this.toastrService.success('An email has been sent to your email address.', 'Success'),
        error: err => this.toastrService.error(err.error, 'Error')
      }
      )
    }
  }

  get username() {
    return this.resetPasswordForm.get('username')?.value
  }
}
