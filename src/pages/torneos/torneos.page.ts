import { Component, OnInit } from '@angular/core';
import {TorneoService} from '../../services/torneo/torneo.service';
import {AlertController, LoadingController, PickerController, PopoverController} from '@ionic/angular';
import {UserService} from '../../services/user/user.service';
import {Torneo} from '../../services/torneo/torneo';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {User} from '../../services/user/user';
import {createErrorAlert} from '../../helpers/createErrorAlert';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  public torneos: Torneo[];
  private loading: HTMLIonLoadingElement;
  private user: User;

  constructor(private torneoService: TorneoService,
              private userService: UserService,
              private loadingController: LoadingController,
              private popoverController: PopoverController,
              private alertController: AlertController,
              private storage: Storage,
              private router: Router,
              public pickerController: PickerController
              ) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(async user => {
      if (user !== null) {
        this.user = user;
        await this.searchTorneos(user);
      }
    });
  }
  async searchTorneos(user) {
    this.loading = await this.loadingController.create({
      message: 'Cargando competiciones...'
    });
    this.loading.present().then(async () => {
      this.torneoService.getTorneos(user).subscribe(res => this.checkTorneos(res));
      await this.loading.dismiss();
    });
  }
  async checkTorneos(res) {
    if (res.Error) {
      const alert = await createErrorAlert(res.Error, this.alertController, this.userService, this.storage, this.router);
      await alert.present();
    } else {
      if (res.length > 0) {
        this.torneos = res;
      }
    }
  }
  async doRefresh(e) {
    this.torneoService.getTorneos(this.user).subscribe(res => {
      this.checkTorneos(res);
      e.target.complete();
    });
  }
  async openPicker(idTorneo) {
    const picker = await this.pickerController.create({
      columns: [{
        name: 'Categorías',
        options: await this.getCategorias(idTorneo),
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (value) => {
            this.router.navigate([`torneos/torneo/${idTorneo}`]);
          }
        }
      ]
    });
    await picker.present();
  }
  async getCategorias(idTorneo) {
    const {categorias} = await this.torneoService.getCategorias(idTorneo).pipe().toPromise();
    return categorias.map(categoria => {
      return {
        text: categoria.nombre,
        value: categoria.idcategoria
      };
    });
  }
}
