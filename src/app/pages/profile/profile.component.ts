import { Component, OnInit } from '@angular/core';
import { ERole } from 'src/app/model/ERole.model';
import { User } from 'src/app/model/User.model';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User('username', '', 'email@example.com', ERole.REGULAR_USER, false);
  constructor(private jwtUtilsService: JwtUtilsService) { }

  ngOnInit(): void {
    this.user.username = this.jwtUtilsService.getUsername()
  }

}
