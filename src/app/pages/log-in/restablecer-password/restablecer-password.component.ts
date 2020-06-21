import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-olvidar-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.scss'],
})
export class RestablecerPasswordComponent implements OnInit {
  public forgottenPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private modalController: ModalController,
              private userService: UserService) { }

  ngOnInit() {
    this.forgottenPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }
  onSubmit(form) {
    if (this.forgottenPasswordForm.status === 'VALID') {
      this.userService.recoverPassword(form.email).subscribe(data => console.log(data));
    }
  }

}
