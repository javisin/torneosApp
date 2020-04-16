import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../services/app.service';
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss'],
})
export class ListaCategoriasComponent implements OnInit {
  private idTorneo: string;
  private categorias: any[];
  constructor(
    private serv: AppService,
    private navParams: NavParams
  ) {
    this.idTorneo = this.navParams.data.torneoID;
  }

  ngOnInit() {
    this.serv.getCategorias(this.idTorneo).subscribe(res => {
      this.categorias = res.categorias;
    });
  }

}
