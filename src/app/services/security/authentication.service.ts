import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BusinessUserRegister, RegularUserRegister, User } from '../../model/User.model';


@Injectable()
export class AuthenticationService {


  constructor(private http: HttpClient) {
  }
  verify(verificationId: string) {
    return this.http.put(`${environment.api}/auth/verify/${verificationId}/`, {})
  }
  registerRegularUser(user: RegularUserRegister, captchaToken: String) {
    return this.http.post(`${environment.api}/auth/register/user/`, { ...user, captchaToken });
  }
  registerBusinessUser(user: BusinessUserRegister, captchaToken: String) {
    return this.http.post(`${environment.api}/auth/register/business/`, { ...user, captchaToken });
  }
  login(user: User, captchaToken: String) {
    return this.http.post(`${environment.api}/auth/login/`, { ...user, captchaToken }, { responseType: 'text' });
  }
  logout(): void {
    sessionStorage.removeItem('token');
    location.href = "/"
  }
}
