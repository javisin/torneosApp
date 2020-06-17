import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private storage: Storage) {
  }

  async ngOnInit(): Promise<void> {
    this.loginForm = this.formBuilder.group({
      user: '',
      password: ''
    });
  }

  onSubmit(form): void {
    this.userService.logIn(form).subscribe(
      async user => {
        await this.storage.set('user', user);
        this.userService.setStorageUser();
        await this.router.navigate(['./torneos']);
      },
      async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.error,
          buttons: ['OK'],
          translucent: true,
        });
        await alert.present();
      });
  }
}
