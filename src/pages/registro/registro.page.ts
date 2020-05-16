import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {AlertController} from '@ionic/angular';
import { MustMatch } from '../../helpers/mustMatch.validator';
import {Router} from '@angular/router';

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
  // IMPORTANTE RESPUESTA DEL REGISTRO, VALIDO O NO

  onSubmit(form) {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.status === 'VALID') {
      this.userService.registerUser(form).subscribe(async res => {
        if (res.Error) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: res.Error,
            buttons: [
              {
                text: 'OK',
                handler: async () => {
                  await this.alertController.dismiss();
                }
              },
            ],
            translucent: true,
          });
          await alert.present();
        } else {
          await this.router.navigate(['/log-in']);
        }
      });
    }
  }
}
