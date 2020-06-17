import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-resultados-equipo-modal',
  templateUrl: './resultados-equipo-modal.component.html',
  styleUrls: ['./resultados-equipo-modal.component.scss'],
})
export class ResultadosEquipoModalComponent implements OnInit {
  @Input() idCategoria: string;
  @Input() idEquipo: string;
  @Input() categoriaType: string;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }
  async dismissModal(): Promise<void> {
    await this.modalController.dismiss();
  }

}
