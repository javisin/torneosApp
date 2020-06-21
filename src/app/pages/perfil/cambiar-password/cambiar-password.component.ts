import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../helpers/mustMatch.validator';
import {UserService} from '../../../services/user/user.service';
import {ErrorService} from '../../../services/alert/error.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss'],
})
export class CambiarPasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  private seePassword: boolean;

  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder,
              private alertController: AlertController,
              private userService: UserService,
              private errorService: ErrorService) {
    this.seePassword = false;
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      antigua: ['', [Validators.required]],
      nueva: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    }, {validator: MustMatch('nueva', 'confirmPassword') });
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }
  get FormControl() {
    return this.changePasswordForm.controls;
  }
  getSeePassword(): boolean {
    return this.seePassword;
  }
  toggleSeePassword(): void {
    this.seePassword = !this.seePassword;
  }
  onSubmit(form) {
    if (this.changePasswordForm.status === 'VALID') {
      delete form.confirmPassword;
      this.userService.changePassword(form).subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Contraseña modificada',
            message: 'Contraseña actualizada con éxito',
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
