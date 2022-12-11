import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtUtilsService } from './jwt-utils.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessUserCanActivateGuard implements CanActivate {
  constructor(
    private jwtUtilsService: JwtUtilsService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.jwtUtilsService.getRole() == 'ROLE_BUSINESS') {
      return true;
    } else {
      return false;
    }
  }
}
