import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

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
      private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (localStorage.getItem('token') === '2') {
        this.router.navigate(['./torneo']);
    }
    this.loginForm = this.formBuilder.group({
        user: '',
        password: ''
    });
  }

  onSubmit(form) {
    this.appService.logIn(form).subscribe(
        response => {
            if (response.login === 'ok') {
                localStorage.setItem('token', '1');
                // localStorage.setItem('usuario', response.body); Añadir el usuario al localStorage
                this.router.navigate(['./torneos']);
            } else {
                console.log('usuario incorrecto');
            }
          // console.log(localStorage.getItem('pwd'));
        },
        error => console.log(error)
    );
  }

}
