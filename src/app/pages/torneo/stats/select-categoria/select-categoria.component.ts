import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {Categoria} from '../../../../services/torneo/categoria';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-categoria',
  templateUrl: './select-categoria.component.html',
  styleUrls: ['./select-categoria.component.scss'],
})
export class SelectCategoriaComponent implements OnInit {
  @Input() idTorneo: string;
  public categorias: Categoria[];

  constructor(private torneoService: TorneoService,
              private popoverController: PopoverController,
              private router: Router) { }
  ngOnInit() {
    this.torneoService.getCategorias(this.idTorneo).subscribe(categorias => this.categorias = categorias);
  }
  async dismissPopover() {
    await this.popoverController.dismiss();
  }
  async navigateToCategoria(id: string) {
    await this.dismissPopover();
    await this.router.navigate([`torneo/${id}`]);
  }

}
