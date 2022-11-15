import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class JwtUtilsService {
  constructor() {
  }
  decodeToken() {
    const token = this.getToken()
    if (token != "") {
      let jwtData = token.split('.')[1]

      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      if(decodedJwtData != undefined) return decodedJwtData
    }
    return false;
  }
  getRole(): string {
    return this.decodeToken() ? this.decodeToken().role : null;
  }
  getUsername():string {
    return this.decodeToken() ? this.decodeToken().username : null;
  }
  getExp():string {
    return this.decodeToken() ? this.decodeToken().exp : null;
  }
  hasRole(role: string): boolean {
    return this.decodeToken().role == role
  }
  setToken(token: string) {
    sessionStorage.setItem('token', token)
    return true;
  }
  getToken(): string {
    const sessionStorageToken = sessionStorage.getItem('token')
    return sessionStorageToken ? sessionStorageToken : '';
  }
  isLoggedIn(): boolean {
    if (this.getToken() != '' && this.getUsername() != null && this.getExp() != null && this.getRole() != null) return true;
    return false;
  }
}
