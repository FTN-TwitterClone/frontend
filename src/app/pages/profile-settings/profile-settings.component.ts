import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  privacy: boolean = false
  constructor(private profileService: ProfileService, private jwtUtilsService: JwtUtilsService, private authService: AuthenticationService) { }
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
}