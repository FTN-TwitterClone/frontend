import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtUtilsService {
  constructor(private authService: AuthenticationService) {
  }
  decodeToken() {
    const token = this.authService.getToken()
    if (token != "") {
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      return decodedJwtData
    }
    return false;
  }
  getRole(): string {
    return this.decodeToken() ? this.decodeToken().role : undefined;
  }

  getUsername() {
    return this.decodeToken() ? this.decodeToken().username : undefined;
  }
  getExp() {
    return this.decodeToken() ? this.decodeToken().exp : undefined;
  }

  hasRole(role: string): boolean {
    return this.decodeToken().role == role
  }

}
