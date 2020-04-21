import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../services/app.service';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent implements OnInit {
  public idTorneo: string;
  public categorias: any[];
  constructor(
    private serv: AppService,
    private navParams: NavParams,
    private popoverController: PopoverController
  ) {
    this.idTorneo = this.navParams.data.torneoID;
  }

  ngOnInit() {
    this.serv.getCategorias(this.idTorneo).subscribe(res => {
      this.categorias = res.categorias;
    });
  }
  async closePopOver() {
    await this.popoverController.dismiss();
  }

}
