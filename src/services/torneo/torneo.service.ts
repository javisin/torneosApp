import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Torneo} from './torneo';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://www.todotorneos.com/wsapp06';
  }
  getTorneos(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token'
      })
    };
    return this.http.get(`${this.url}/gettorneoslist.php?user=demoapp4&token=${user.token}`);
  }
  getTorneo(idTorneo, jornada): Observable<any> {
    const params = jornada ? `torneo=148990&jornada=${jornada}` : `torneo=148990`;
    return this.http.get(`${this.url}/getrdos.php?${params}`);
  }

  getCategorias(idTorneo): Observable<any> {
    return this.http.get(`${this.url}/getcategorias.php?torneo=${idTorneo}`);
  }
}
