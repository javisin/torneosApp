import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  private loginForm;

  constructor(
    private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController) {
  }

  async ngOnInit() {
    if (localStorage.getItem('token') === '1') {
      await this.router.navigate(['./torneos']);
    }
    this.loginForm = this.formBuilder.group({
      user: '',
      password: ''
    });
  }

  async onSubmit(form) {
    this.appService.logIn(form).subscribe(
      async response => {
        if (response.login === 'ok') {
          localStorage.setItem('user', JSON.stringify(response));
          console.log('hola');
          // localStorage.setItem('usuario', response.body); Añadir el usuario al localStorage
          await this.router.navigate(['./torneos']);
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'El usuario o la contraseña son incorrectos.',
            buttons: ['OK'],
            translucent: true,
          });
          await alert.present();
        }
      },
    );
  }
}
