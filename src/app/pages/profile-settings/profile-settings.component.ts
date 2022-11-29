import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { User } from 'src/app/model/User.model';
import { RegularUser } from 'src/app/model/RegularUser.model';
import { firstValueFrom } from 'rxjs';

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
  privacy: boolean = false
  constructor(private profileService: ProfileService, private fb: FormBuilder, private jwtUtilsService: JwtUtilsService) { }
  ngOnInit(): void {
    this.loadPrivacy()
  }
  onSubmit() {
    this.privacy = !this.privacy
    this.profileService.updateProfile(this.jwtUtilsService.getUsername(), this.privacy).subscribe((res) => {
      alert('Account privacy set to: ' + this.privacy)
    })
  }
  loadPrivacy() {
    this.profileService.getCurrentUser().subscribe(res => {
      const user = res as RegularUser
      this.privacy = user.private
    })
  }
  onChangePassword() {
    if (this.repeatPassword === this.newPassword && this.changePasswordForm.valid && this.currentPassword != null && this.newPassword != null && this.repeatPassword != null) {
      this.profileService.changePassword(this.currentPassword, this.newPassword).subscribe(res => {
        console.log(res)
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