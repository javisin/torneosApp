import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {User} from '../../services/user/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, ModalController} from '@ionic/angular';
import {CambiarPasswordComponent} from './cambiar-password/cambiar-password.component';
import {UserService} from '../../services/user/user.service';
import {ErrorService} from '../../services/error/error.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: User;
  public updateUserForm: FormGroup;

  constructor(private ionicStorage: Storage,
              private formBuilder: FormBuilder,
              private modalController: ModalController,
              private alertController: AlertController,
              private userService: UserService,
              private errorService: ErrorService) { }
  async ngOnInit() {
    this.user = await this.ionicStorage.get('user');
    this.updateUserForm = this.formBuilder.group({
      nombre: [this.user.nombre, Validators.required],
      apellidos: [this.user.ape, Validators.required]
    });
  }
  get FormControl() {
    return this.updateUserForm.controls;
  }
  onSubmit(form) {
    if (this.updateUserForm.status === 'VALID') {
      this.userService.updateUser(form).subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Perfil modificado',
            message: 'Perfil actualizado con éxito',
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
              }
            ]
          });
          await alert.present();
        },
        async error => {
          const alert = await this.errorService.createErrorAlert(error.error, error.status);
          await alert.present();
        });
    }
  }
  async presentPasswordModal() {
    const modal = await this.modalController.create({
      component: CambiarPasswordComponent,
    });
    return await modal.present();
  }

}
