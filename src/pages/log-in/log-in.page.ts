import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  private username: string;
  private password: string;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') === '2') {
        this.router.navigate(['./torneo']);
    }
    this.username = '';
    this.password = '';
  }

  onSubmit() {
    this.appService.logIn(this.username, this.password).subscribe(
        response => {
            if (response.login === 'ok') {
                localStorage.setItem('token', '1');
                localStorage.setItem('usuario', response.body);
                this.router.navigate(['./torneo']);
            } else {
                console.log('usuario incorrectoo');
            }
          // console.log(localStorage.getItem('pwd'));
        },
        error => console.log(error)
    );
  }

}
