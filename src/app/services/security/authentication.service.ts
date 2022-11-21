import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { RegularUser } from '../../model/RegularUser.model';
import { BusinessUser } from '../../model/BusinessUser.model';
import { User } from 'src/app/model/User.model';


@Injectable()
export class AuthenticationService {


  constructor(private http: HttpClient) {
  }
  verify(verificationId:string){
    return this.http.put(`${environment.api}/auth/verify/${verificationId}/`, {})
  }
  registerRegularUser(user: RegularUser, captchaToken: String) {
    return this.http.post(`${environment.api}/auth/register/user/`, { ...user, captchaToken });
  }
  registerBusinessUser(user: BusinessUser, captchaToken: String) {
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
