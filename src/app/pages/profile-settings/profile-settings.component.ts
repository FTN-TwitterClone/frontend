import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
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
  constructor(private profileService: ProfileService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.loadPrivacy()
  }
  onSubmit() {
    this.private = !this.private
    this.profileService.updateProfile(this.private).subscribe(() => {
      alert('Account privacy set to: ' + this.private)
    })
  }
  loadPrivacy() {
    this.profileService.getCurrentUser().subscribe(res => {
      const user = res as User
      this.private = user.private
    })
  }
  onChangePassword() {
    if (this.repeatPassword === this.newPassword && this.changePasswordForm.valid && this.currentPassword != null && this.newPassword != null && this.repeatPassword != null) {
      this.profileService.changePassword(this.currentPassword, this.newPassword).subscribe(() => {
        alert('Password changed successfully.')
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