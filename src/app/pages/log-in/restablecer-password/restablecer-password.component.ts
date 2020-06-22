import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {AlertController, ModalController} from '@ionic/angular';
import {ErrorService} from '../../../services/error/error.service';

@Component({
  selector: 'app-olvidar-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.scss'],
})
export class RestablecerPasswordComponent implements OnInit {
  public forgottenPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private modalController: ModalController,
              private alertController: AlertController,
              private errorService: ErrorService,
              private userService: UserService) { }

  ngOnInit() {
    this.forgottenPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }
  get FormControl() {
    return this.forgottenPasswordForm.controls;
  }
  onSubmit(form) {
    this.forgottenPasswordForm.markAllAsTouched();
    if (this.forgottenPasswordForm.status === 'VALID') {
      this.userService.recoverPassword(form.email).subscribe(async () => {
          const alert = await this.alertController.create({
            header: 'Email enviado',
            message: `Se ha enviado un correo a la dirección ${form.email}
            con las instrucciones para restablecer la contraseña`,
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
                handler: async () => {
                  await this.dismissModal();
                }
              }
            ]
          });
          await alert.present();
        },
        async error => {
          const alert = await this.errorService.createErrorAlert(error);
          await alert.present();
        });
    }
  }

}
