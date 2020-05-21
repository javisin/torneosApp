import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Torneo} from './torneo';
import {Global} from '../global';
import {User} from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }
  getTorneos(user): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(`${this.url}/gettorneoslist.php?usuario=${user.email}&token=${user.token}&soloactivos=N`);
  }
  getTorneo(user, idTorneo): Observable<Torneo[]> {
    return this.http.get<any>(`${this.url}/gettorneo.php?usuario=${user.email}&token=${user.token}&idtorneo=${idTorneo}`);
  }
  getResultados(idTorneo, jornada): Observable<any> {
    const params = jornada ? `torneo=${idTorneo}&jornada=${jornada}` : `torneo=${idTorneo}`;
    return this.http.get(`${this.url}/getrdos.php?${params}`);
  }
  getMisResultados(idTorneo, idEquipo): Observable<any> {
    return this.http.get(`${this.url}/getrdosequipo.php?torneo=${idTorneo}&idequipo=${idEquipo}`);
  }
  getCategorias(idTorneo): Observable<any> {
    return this.http.get(`${this.url}/getcategorias.php?torneo=${idTorneo}`);
  }
  getClasificacion(idTorneo): Observable<any> {
    return this.http.get(`${this.url}/getclasifica.php?torneo=${idTorneo}`);
  }
  getInvitaciones(user: User): Observable<any> {
    return this.http.get(`${this.url}/getinvitaciones.php?usuario=${user.email}&token=${user.token}`);
  }
  responseInvitacion(user: User, idInvitation: string, response: string): Observable<any> {
    const form = new FormData();
    form.append('usuario', user.email);
    form.append('token', user.token);
    form.append('idinvitacion', idInvitation);
    form.append('respuesta', response);
    return this.http.post(`${this.url}/respondeinvitacion.php`, form);
  }
}
