import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss'],
})
export class MenuUsuarioComponent implements OnInit {

  constructor(private router: Router,
              public popoverController: PopoverController) { }

  ngOnInit() {}
  logOut() {
    localStorage.clear();
    this.popoverController.dismiss().then(() => this.router.navigate(['/log-in']));
  }
}
