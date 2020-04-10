import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  torneos: any[];
  loading: HTMLIonLoadingElement;

  constructor(private appService: AppService,
              public loadingController: LoadingController) {
  }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    this.loading = await this.loadingController.create({
      message: 'Cargando competiciones...'
    });
    this.loading.present().then(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.appService.getTorneos('demoapp4', user.token).subscribe(res => {
        this.torneos = Object.values(res);
        this.torneos.splice(0, 1); // Intentar resolver de otro modo
        this.loading.dismiss();
      });
    });
  }
}
