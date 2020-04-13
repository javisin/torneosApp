import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private readonly url: string;
    private readonly currentUser: BehaviorSubject<any>;

    constructor(private http: HttpClient,
                private storage: Storage) {
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
    getTorneo(): Observable<any> {
        return this.http.get(`${this.url}/getrdos.php?torneo=148990`);
    }
    getUser(): Observable<any> {
        return this.currentUser;
    }
    updateUser(value) {
        this.currentUser.next(value);
    }
}
