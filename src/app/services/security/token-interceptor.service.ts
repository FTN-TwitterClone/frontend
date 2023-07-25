import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtUtilsService } from './jwt-utils.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inj: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwtUtilsService: JwtUtilsService = this.inj.get(JwtUtilsService);
    let token = jwtUtilsService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }

}
