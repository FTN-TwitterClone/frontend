import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  changePasswordForm = this.fb.group({
    'currentPassword': ['', Validators.required],
    'newPassword': ['', Validators.required],
    'repeatPassword': ['', Validators.required]
  })
  private: boolean = false
  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private errorHandlerService: ErrorHandlerService) { }
  ngOnInit(): void {
    this.loadPrivacy()
  }
  onSubmit() {
    this.private = !this.private
    this.profileService.updateProfile(this.private).subscribe({
      complete: () => alert('Account privacy has been changed successfully'),
      error: err => this.errorHandlerService.alert(err)
    })
  }
  loadPrivacy() {
    this.profileService.getCurrentUser().subscribe({
      next: user => {
        let regUser = user as User
        this.private = regUser.private
      },
      error: error => this.errorHandlerService.alert(error)
    })
  }
  onChangePassword() {
    let formValid: boolean = this.repeatPassword === this.newPassword && this.changePasswordForm.valid
    if (formValid) {
      this.profileService.changePassword(this.currentPassword!, this.newPassword!).subscribe({
        complete: () => {
          alert('Password has been changed successfully.')
          this.changePasswordForm.reset()
        },
        error: err => {
          this.errorHandlerService.alert(err)
        }
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