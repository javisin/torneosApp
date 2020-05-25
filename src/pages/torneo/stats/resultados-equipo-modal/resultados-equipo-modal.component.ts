import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-resultados-equipo',
  templateUrl: './resultados-equipo-modal.component.html',
  styleUrls: ['./resultados-equipo-modal.component.scss'],
})
export class ResultadosEquipoModalComponent implements OnInit {
  @Input() idCategoria: any;
  @Input() idEquipo: any;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }

}
