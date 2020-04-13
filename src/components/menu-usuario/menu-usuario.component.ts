import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PopoverController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss'],
})
export class MenuUsuarioComponent implements OnInit {

  constructor(private router: Router,
              private popoverController: PopoverController,
              private storage: Storage,
              private appService: AppService) { }

  ngOnInit() {}
  async logOut() {
    await this.storage.remove('user');
    this.appService.updateUser(null);
    await this.popoverController.dismiss();
    await this.router.navigate(['/log-in']);
  }
}
