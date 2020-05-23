import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Torneo} from './torneo';
import {Global} from '../global';
import {User} from '../user/user';
import {Jornada} from './jornada';
import {Categoria} from './categoria';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private readonly url: string;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.url = Global.url;
  }
  getTorneos(user): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(`${this.url}/gettorneoslist.php?usuario=${user.email}&token=${user.token}&soloactivos=N`);
  }
  getCategoria(user, idTorneo): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url}/gettorneo.php?usuario=${user.email}&token=${user.token}&idtorneo=${idTorneo}`);
  }
  getResultados(idTorneo, jornada): Observable<Jornada> {
    const params = jornada ? `torneo=${idTorneo}&jornada=${jornada}` : `torneo=${idTorneo}`;
    return this.http.get<Jornada>(`${this.url}/getrdosliga.php?${params}`);
  }
  getMisResultados(idTorneo, idEquipo): Observable<Jornada> {
    return this.http.get<Jornada>(`${this.url}/getrdosequipo.php?torneo=${idTorneo}&idequipo=${idEquipo}`);
  }
  getCategorias(idTorneo): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/getcategorias.php?torneo=${idTorneo}`);
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
  setResult(resultForm): Observable<any> {
    const form = new FormData();
    for (const key in resultForm) {
      if (resultForm.hasOwnProperty(key)) {
        form.append(key, resultForm[key]);
      }
    }
    const user = this.userService.getUser().value;
    form.append('usuario', user.email);
    form.append('token', user.token);
    return this.http.post(`${this.url}/grabardoliga.php`, form);
  }
}
