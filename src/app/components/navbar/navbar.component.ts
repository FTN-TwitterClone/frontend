import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private jwtUtilsService:JwtUtilsService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.jwtUtilsService.isLoggedIn()
  }
}
