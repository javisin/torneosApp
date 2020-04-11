import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    if (localStorage.getItem('user') !== null) {
      return true;
    } else {
      this.router.navigate(['./log-in']);
    }
  }
}
