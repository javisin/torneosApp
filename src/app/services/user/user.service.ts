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
  logIn(loginForm: any): Observable<User> {
    const form = objectToForm(loginForm);
    const SOType = this.SO === 'android' ? '1' : '2';
    form.append('so', SOType);
    form.append('id', this.pushToken);
    return this.http.post<User>(`${this.url}/solologin.php`, form);
  }
  registerUser(registerForm: any): Observable<any> {
    const form = objectToForm(registerForm);
    return this.http.post<any>(`${this.url}/registra421.php`, form);
  }
  recoverPassword(email: string) {
    const form = new FormData();
    form.append('usuario', email);
    return this.http.post<any>(`${this.url}/recordarpwd.php`, form);
  }
  updateUser(updateForm: any) {
    const form = objectToForm(updateForm);
    form.append('usuario', this.currentUser.getValue().email);
    form.append('token', this.currentUser.getValue().token);
    return this.http.post<any>(`${this.url}/cambiaperfil.php`, form);
  }
  changePassword(changePasswordForm) {
    const form = objectToForm(changePasswordForm);
    form.append('usuario', this.currentUser.getValue().email);
    form.append('token', this.currentUser.getValue().token);
    return this.http.post<any>(`${this.url}/cambiapwd.php`, form);
  }
  getUser(): BehaviorSubject<User> {
    return this.currentUser;
  }
  setStorageUser(): void {
    this.storage.get('user').then(user => {
      this.currentUser.next(user);
    });
  }
  setPushToken(token: string): void {
    this.pushToken = token;
  }
  setSO(SO: string): void {
    this.SO = SO;
  }
}
