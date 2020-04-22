import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly url: string;
    private readonly currentUser: BehaviorSubject<User>;
    private pushToken: string;

    constructor(private http: HttpClient) {
        this.url = 'https://www.todotorneos.com/wsapp06';
        this.currentUser = new BehaviorSubject<User>(null);
    }
    logIn(loginForm): Observable<User> {
        const form = new FormData();
        for (const key in loginForm) {
            if (loginForm.hasOwnProperty(key)) {
                form.append(key, loginForm[key]);
            }
        }
        form.append('pushToken', this.pushToken);
        return this.http.post<User>(`${this.url}/solologin.php`, form);
    }
    registerUser(registerForm): Observable<object> {
        const form = new FormData();
        for (const key in registerForm) {
            if (registerForm.hasOwnProperty(key)) {
                form.append(key, registerForm[key]);
            }
        }
        return this.http.post<object>(`${this.url}/registra421.php`, form);
    }
    getUser(): Observable<User> {
        return this.currentUser;
    }
    setPushToken(token) {
        this.pushToken = token;
    }
    updateUser(value) {
        this.currentUser.next(value);
    }
}
