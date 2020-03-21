import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm;

  constructor(
      private formBuilder: FormBuilder,
      private appService: AppService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: '',
      apellidos: '',
      email: '',
      nick: '',
      contraseña: '',
    });
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.appService.registerUser(form).subscribe(res => {
      console.log(res);
    });
  }
}
