import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BusinessUser } from '../model/BusinessUser.model';
import { RegularUser } from '../model/RegularUser.model';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginCredentials: User) {
    return this.http.post(`${environment.api}/login/`, loginCredentials);
  }
  register(user: User) {
    return this.http.post(`${environment.api}/register/`, user);
  }
}
