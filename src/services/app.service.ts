import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private readonly url: string;

    constructor(private http: HttpClient) {
        this.url = 'https://www.todotorneos.com/wsapp06';
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
    getTorneos(idUser, token): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'my-auth-token'
            })
        };
        return this.http.get(`${this.url}/gettorneoslist.php?user=${idUser}&token=${token}`);
    }
}
