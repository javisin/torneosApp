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
    return this.http.get<Torneo[]>(`${this.url}/gettorneoslist.php?user=demoapp4&token=${user.token}`);
  }
  getResultados(idTorneo, jornada): Observable<any> {
    const params = jornada ? `torneo=${idTorneo}&jornada=${jornada}` : `torneo=${idTorneo}`;
    return this.http.get(`${this.url}/getrdos.php?${params}`);
  }
  getMisResultados(idTorneo, jornada): Observable<any> {
    const params = jornada ? `torneo=${idTorneo}&jornada=${jornada}` : `torneo=${idTorneo}`;
    return this.http.get(`${this.url}/getrdos.php?${params}`);
  }

  getCategorias(idTorneo): Observable<any> {
    return this.http.get(`${this.url}/getcategorias.php?torneo=${idTorneo}`);
  }
  getClasificacion(idTorneo): Observable<any> {
    return this.http.get(`${this.url}/getclasifica.php?torneo=${idTorneo}`);
  }
}
