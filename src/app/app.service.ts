import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://www.todotorneos.com/wsapp06/identificate.php';
  }

  logIn(username, password): Observable<any> {
    const form = new FormData();
    form.append('user', username);
    form.append('password', password);
    return this.http.post(this.url, form);
  }
}
