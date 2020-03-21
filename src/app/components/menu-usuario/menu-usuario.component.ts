import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss'],
})
export class MenuUsuarioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  logOut() {
    console.log('aa');
    localStorage.clear();
    this.router.navigate(['/log-in']);
  }
}
