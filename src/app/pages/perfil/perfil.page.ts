import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {User} from '../../services/user/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {ChangePasswordComponent} from './change-password/change-password.component';

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
              private modalController: ModalController) { }

  async ngOnInit() {
    this.user = await this.ionicStorage.get('user');
    this.updateUserForm = this.formBuilder.group({
      nombre: [this.user.nombre, Validators.required],
      apellidos: [this.user.ape, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }
  get FormControl() {
    return this.updateUserForm.controls;
  }
  onSubmit(form) {
    console.log(form);
  }
  async presentPasswordModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordComponent,
    });
    return await modal.present();
  }

}
