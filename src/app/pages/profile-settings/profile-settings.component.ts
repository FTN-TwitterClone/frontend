import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/model/User.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  changePasswordForm = new FormBuilder().group({
    'currentPassword': ['', Validators.required],
    'newPassword': ['', Validators.required],
    'repeatPassword': ['', Validators.required]
  })
  private: boolean = false
  constructor(
    private profileService: ProfileService,
    private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.loadPrivacy()
  }
  onSubmit() {
    this.private = !this.private
    this.profileService.updateProfile(this.private).subscribe({
      complete: () => this.toastrService.success('Account privacy has been changed successfully', 'Success'),
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  loadPrivacy() {
    this.profileService.getCurrentUser().subscribe({
      next: user => {
        let regUser = user as User
        this.private = regUser.private
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  onChangePassword() {
    let formValid: boolean = this.repeatPassword === this.newPassword && this.changePasswordForm.valid
    if (formValid) {
      this.profileService.changePassword(this.currentPassword!, this.newPassword!).subscribe({
        complete: () => {
          this.toastrService.success('Password has been changed successfully.','Success')
          this.changePasswordForm.reset()
        },
        error: err => this.toastrService.error(err.error, 'Error')
      })
    }
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword')?.value
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword')?.value
  }
  get repeatPassword() {
    return this.changePasswordForm.get('repeatPassword')?.value
  }
}