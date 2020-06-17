import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {AlertController} from '@ionic/angular';
import { MustMatch } from '../../helpers/mustMatch.validator';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public registerForm: FormGroup;
  private seePassword: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private alertService: AlertService,
      private router: Router,
      private alertController: AlertController
  ) {
    this.seePassword = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nick: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    }, {validator: MustMatch('password', 'confirmPassword') });
  }
  get FormControl() {
    return this.registerForm.controls;
  }
  getSeePassword(): boolean {
    return this.seePassword;
  }
  toggleSeePassword(): void {
    this.seePassword = !this.seePassword;
  }
  onSubmit(form) {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.status === 'VALID') {
      this.userService.registerUser(form).subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Confirmación de registro',
            message: `Se ha enviado un correo de confirmación a ${form.email}.
              Por favor, verifica tu correo para continuar.`,
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
                handler: async () => {
                  await this.alertController.dismiss();
                  await this.router.navigate(['/log-in']);
                }
              },
            ],
            translucent: true,
          });
          await alert.present();
        },
        async error => {
          const alert = await this.alertService.createErrorAlert(error.error, error.status);
          await alert.present();
        },
      );
    }
  }
}
