import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BusinessUser } from '../model/BusinessUser.model';
import { RegularUser } from '../model/RegularUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerRegularUser(user: RegularUser) {
    return this.http.post(`${environment.api}/auth/register/user/`, user);
  }
  registerBusinessUser(user: BusinessUser) {
    return this.http.post(`${environment.api}/auth/register/business/`, user);
  }
}
