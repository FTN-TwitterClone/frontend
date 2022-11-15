import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import { JwtUtilsService } from './jwt-utils.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {
  constructor(private jwtUtilsService:JwtUtilsService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.jwtUtilsService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
