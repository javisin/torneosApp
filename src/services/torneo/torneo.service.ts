import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Torneo} from './torneo';
import {Global} from '../global';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }
  getTorneos(user): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(`${this.url}/gettorneoslist2.php?usuario=demoapp4&token=${user.token}`);
  }
  getTorneo(user, idTorneo): Observable<Torneo[]> {
    return this.http.get<any>(`${this.url}/gettorneo.php?usuario=demoapp4&token=${user.token}&idtorneo=${idTorneo}`);
  }
  getResultados(idTorneo, jornada): Observable<any> {
    const params = jornada ? `torneo=${idTorneo}&jornada=${jornada}` : `torneo=${idTorneo}`;
    return this.http.get(`${this.url}/getrdos.php?${params}`);
  }
  getMisResultados(idTorneo, idEquipo): Observable<any> {
    return this.http.get(`${this.url}/getrdos.php?torneo=${idTorneo}&idequipo=${idEquipo}`);
  }

  getCategorias(idTorneo): Observable<any> {
    return this.http.get(`${this.url}/getcategorias.php?torneo=${idTorneo}`);
  }
  getClasificacion(idTorneo): Observable<any> {
    return this.http.get(`${this.url}/getclasifica.php?torneo=${idTorneo}`);
  }
}
