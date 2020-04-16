import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private readonly url: string;
    private readonly currentUser: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.url = 'https://www.todotorneos.com/wsapp06';
        this.currentUser = new BehaviorSubject<any>('null');
    }
    logIn(loginForm): Observable<any> {
        const form = new FormData();
        for (const key in loginForm) {
            if (loginForm.hasOwnProperty(key)) {
                form.append(key, loginForm[key]);
            }
        }
        return this.http.post(`${this.url}/solologin.php`, form);
    }
    registerUser(registerForm): Observable<any> {
        const form = new FormData();
        for (const key in registerForm) {
            if (registerForm.hasOwnProperty(key)) {
                form.append(key, registerForm[key]);
            }
        }
        return this.http.post(`${this.url}/registra421.php`, form);
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
    getUser(): Observable<any> {
        return this.currentUser;
    }
    getCategorias(idTorneo): Observable<any> {
        return this.http.get(`${this.url}/getcategorias.php?torneo=${idTorneo}`);
    }
    updateUser(value) {
        this.currentUser.next(value);
    }
}
