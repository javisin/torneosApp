import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {MenuController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  private registerForm: FormGroup;
  seePassword: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private appService: AppService,
      public nav: NavController
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
    });
    console.log(this.registerForm);
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
      this.appService.registerUser(form).subscribe(res => {
        console.log(res);
      });
    }
  }
}
