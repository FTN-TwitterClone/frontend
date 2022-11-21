import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { RegularUser } from '../../model/RegularUser.model';
import { BusinessUser } from '../../model/BusinessUser.model';


@Injectable()
export class AuthenticationService {


  constructor(private http: HttpClient) {
  }

  registerRegularUser(user: RegularUser, captchaToken: String) {
    return this.http.post(`${environment.api}/auth/register/user/`, {...user, captchaToken});
  }
  registerBusinessUser(user: BusinessUser, captchaToken: String) {
    return this.http.post(`${environment.api}/auth/register/business/`, {...user, captchaToken});
  }
  login(user: Object) {
    return this.http.post(`${environment.api}/auth/login/`, user, { responseType: 'text' });
  }
  logout(): void {
    sessionStorage.removeItem('token');
    location.href = "/"
  }
}
