import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { JwtUtilsService } from './security/jwt-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private jwtUtilsService: JwtUtilsService) { }

  updateProfile(username: string, privacy: boolean) {
    const form = {
      'username': username,
      'private': privacy
    }
    return this.http.patch(`${environment.api}/profile/users/me/`, form)
  }
  getCurrentUser() {
    return this.http.get(`${environment.api}/profile/users/${this.jwtUtilsService.getUsername()}/`)
  }
  getUser(username: string) {
    return this.http.get(`${environment.api}/profile/users/${username}/`)
  }
}
