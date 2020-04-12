import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router,
              private storage: Storage) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> | boolean {
    return this.checkLogin(route);
  }
  async checkLogin(route): Promise<boolean> {
    if (await this.storage.get('user') !== null && route.path === 'log-in') {
      await this.router.navigate(['./torneos']);
    }
    if (await this.storage.get('user') === null && route.path !== 'log-in') {
      await this.router.navigate(['./log-in']);
    }
    return true;
  }
}
