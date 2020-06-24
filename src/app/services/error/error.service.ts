import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {UserService} from '../user/user.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private alertController: AlertController,
              private userService: UserService,
              private storage: Storage,
              private router: Router) { }
  async createErrorAlert(error: string, status: number): Promise<HTMLIonAlertElement> {
    return await this.alertController.create({
      header: 'Error',
      message: error,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: async () => {
            if (status === 401) {
              await this.storage.remove('user');
              this.userService.setStorageUser();
              await this.router.navigate(['/log-in']);
            }
          }
        },
      ],
      translucent: true,
    });
  }
}