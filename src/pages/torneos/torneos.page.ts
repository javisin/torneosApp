import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  private torneos: any[];
  private loading: HTMLIonLoadingElement;

  constructor(private appService: AppService,
              private loadingController: LoadingController,
              ) {
  }

  ngOnInit() {
    this.appService.getUser().subscribe(async user => {
      if (user !== null) {
        this.loading = await this.loadingController.create({
          message: 'Cargando competiciones...'
        });
        this.loading.present().then(() => {
          this.appService.getTorneos(user).subscribe(res => {
            this.torneos = Object.values(res);
            this.torneos.splice(0, 1); // Intentar resolver de otro modo
            this.loading.dismiss();
          });
        });
      }
    });
  }
}
