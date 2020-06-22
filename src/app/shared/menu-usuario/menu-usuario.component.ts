import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PopoverController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss'],
})
export class MenuUsuarioComponent implements OnInit {

  constructor(private router: Router,
              private popoverController: PopoverController,
              private storage: Storage,
              private userService: UserService) { }
  ngOnInit() {}
  async goToProfile() {
    await this.popoverController.dismiss();
    await this.router.navigate(['/perfil']);
  }
  async logOut() {
    await this.storage.remove('user');
    this.userService.setStorageUser();
    await this.popoverController.dismiss();
    await this.router.navigate(['/log-in']);
  }
}
