import { Injectable } from '@angular/core';
import { UserDetails } from 'src/app/model/User.model';

@Injectable()
export class JwtUtilsService {
  constructor() {
  }
  decodeToken(): UserDetails | null {
    const token = this.getToken()
    if (token) {
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData: UserDetails | null = JSON.parse(decodedJwtJsonData)
      if (decodedJwtData != null) return decodedJwtData
    }
    return null;
  }
  getRole(): string | null {
    const decodedToken: UserDetails | null = this.decodeToken()
    return decodedToken ? decodedToken.role : null
  }
  getUsername(): string | null {
    const decodedToken: UserDetails | null = this.decodeToken()
    return decodedToken ? decodedToken.username : null;
  }
  getExp(): string | null {
    const decodedToken: UserDetails | null = this.decodeToken()
    return decodedToken ? decodedToken.exp : null;
  }
  hasRole(role: string): boolean {
    const decodedToken: UserDetails | null = this.decodeToken()
    return decodedToken ? decodedToken.role == role : false
  }
  setToken(token: string) {
    sessionStorage.setItem('token', token)
    return true;
  }
  getToken(): string | null {
    const sessionStorageToken = sessionStorage.getItem('token')
    return sessionStorageToken ? sessionStorageToken : null;
  }
  isLoggedIn(): boolean {
    return this.getToken() ? true : false
  }
}
