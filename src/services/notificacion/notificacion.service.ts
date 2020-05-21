import { Injectable } from '@angular/core';
import {Global} from '../global';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }
  getNotificaciones(user): Observable<any> {
    return this.http.get(`${this.url}/getnotificaciones.php?usuario=${user.email}&token=${user.token}`);
  }
}
