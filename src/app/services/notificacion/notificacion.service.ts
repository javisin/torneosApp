import { Injectable } from '@angular/core';
import {Global} from '../global';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notificacion} from './notificacion';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  url: string;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.url = Global.url;
  }
  getNotificaciones(user, idTorneo): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(
      `${this.url}/getnotificaciones.php?usuario=${user.email}&token=${user.token}&idTorneo=${idTorneo}`);
  }
  readNotificaciones(user, notificaciones): Observable<any> {
    const form = new FormData();
    form.append('usuario', user.email);
    form.append('token', user.token);
    form.append('notificaciones', JSON.stringify(notificaciones));
    return this.http.post(`${this.url}/readnotificaciones.php`, form);
  }
  deleteNotificacion(idNotificacion): Observable<any> {
    const form = new FormData();
    const user = this.userService.getUser().getValue();
    form.append('usuario', user.email);
    form.append('token', user.token);
    form.append('notificaciones', idNotificacion);
    return this.http.post(`${this.url}/readnotificaciones.php`, form);
  }
}
