import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user';
import {Global} from '../global';
import {Storage} from '@ionic/storage';
import {objectToForm} from '../../helpers/objectToForm';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly url: string;
    private readonly currentUser: BehaviorSubject<User>;
    private pushToken: string;
    private SO: string;

    constructor(private http: HttpClient,
                private storage: Storage) {
        this.url = Global.url;
        this.currentUser = new BehaviorSubject<User>(null);
    }
    logIn(loginForm): Observable<User> {
        const form = objectToForm(loginForm);
        const SOType = this.SO === 'android' ? '1' : '2';
        form.append('so', SOType);
        form.append('id', 'test');
        return this.http.post<User>(`${this.url}/solologin.php`, form);
    }
    registerUser(registerForm): Observable<any> {
        const form = objectToForm(registerForm);
        return this.http.post<any>(`${this.url}/registra421.php`, form);
    }
    getUser(): BehaviorSubject<User> {
        return this.currentUser;
    }
    setStorageUser() {
        this.storage.get('user').then(user => {
            this.currentUser.next(user);
        });
    }
    setPushToken(token) {
        this.pushToken = token;
    }
    setSO(SO) {
        this.SO = SO;
    }
}