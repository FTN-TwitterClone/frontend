import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inj: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authenticationService: AuthenticationService = this.inj.get(AuthenticationService);
    let token = authenticationService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `${token}`
        }
      });
    }

    return next.handle(request);
  }

}
