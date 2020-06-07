import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {User} from '../../services/user/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../helpers/mustMatch.validator';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: User;
  public updateUserForm: FormGroup;
  private seePassword: boolean;

  constructor(private ionicStorage: Storage,
              private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.user = await this.ionicStorage.get('user');
    this.updateUserForm = this.formBuilder.group({
      nombre: [this.user.nombre, Validators.required],
      apellidos: [this.user.ape, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    }, {validator: MustMatch('newPassword', 'confirmPassword') });
  }
  get FormControl() {
    return this.updateUserForm.controls;
  }
  getSeePassword(): boolean {
    return this.seePassword;
  }
  toggleSeePassword(): void {
    this.seePassword = !this.seePassword;
  }
  onSubmit(form) {
    console.log(form);
  }

}
