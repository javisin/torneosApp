import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Torneo} from './torneo';
import {Global} from '../global';
import {User} from '../user/user';
import {Jornada} from './jornada';
import {Categoria} from './categoria';
import {UserService} from '../user/user.service';
import {objectToForm} from '../../helpers/objectToForm';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private readonly url: string;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.url = Global.url;
  }
  getTorneos(user): Observable<any> {
    return this.http.get<any>
    (`${this.url}/gettorneoslist.php?usuario=${user.email}&token=${user.token}&soloactivos=N`);
  }
  getCategoria(idTorneo): Observable<Categoria> {
    const user = this.userService.getUser().getValue();
    return this.http.get<Categoria>(`${this.url}/getcategoria.php?usuario=${user.email}&token=${user.token}&idtorneo=${idTorneo}`);
  }
  getResultados(idTorneo, type, jornada): Observable<Jornada> {
    if (type === '1') {
      const params = jornada ? `torneo=${idTorneo}&fase=${jornada}` : `torneo=${idTorneo}`;
      return this.http.get<Jornada>(`${this.url}/getrdoseliminatoria.php?${params}`);
    } else {
      const params = jornada ? `torneo=${idTorneo}&jornada=${jornada}` : `torneo=${idTorneo}`;
      return this.http.get<Jornada>(`${this.url}/getrdosliga.php?${params}`);
    }
  }
  getMisResultados(idTorneo, idEquipo, categoriaType): Observable<Jornada> {
    const endpoint = categoriaType === '1' ? 'getrdoseliminatoriaequipo.php' : 'getrdosligaequipo.php';
    return this.http.get<Jornada>(`${this.url}/${endpoint}?torneo=${idTorneo}&idequipo=${idEquipo}`);
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
  responseInvitacion(idInvitation: string, response: string): Observable<any> {
    const user = this.userService.getUser().getValue();
    const form = new FormData();
    form.append('usuario', user.email);
    form.append('token', user.token);
    form.append('idinvitacion', idInvitation);
    form.append('respuesta', response);
    return this.http.post(`${this.url}/respondeinvitacion.php`, form);
  }
  setResult(resultForm, type): Observable<any> {
    const form = objectToForm(resultForm);
    const user = this.userService.getUser().getValue();
    form.append('usuario', user.email);
    form.append('token', user.token);
    const endpoint = type === '1' ? 'grabardoeliminatoria.php' : 'grabardoliga.php';
    return this.http.post(`${this.url}/${endpoint}`, form);
  }
  validateResultado(validateForm) {
    const form = objectToForm(validateForm);
    const user = this.userService.getUser().getValue();
    form.append('usuario', user.email);
    form.append('token', user.token);
    return this.http.post(`${this.url}/validardo.php`, form);
  }
}
