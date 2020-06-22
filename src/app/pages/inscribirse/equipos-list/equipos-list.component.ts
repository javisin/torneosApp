import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {AlertController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../../../services/error/error.service';
import {RefreshService} from '../../../services/refresh/refresh.service';

@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.component.html',
  styleUrls: ['./equipos-list.component.scss'],
})
export class EquiposListComponent implements OnInit {
  @Input() idCategoria: any;
  public equipos: any;
  public newEquipoForm: FormGroup;
  public canInscribe: boolean;
  public showForm: boolean;

  constructor(private torneoService: TorneoService,
              private modalController: ModalController,
              private formBuilder: FormBuilder,
              private errorService: ErrorService,
              private alertController: AlertController,
              private refreshService: RefreshService) {
    this.showForm = false;
  }

  ngOnInit() {
    this.newEquipoForm = this.formBuilder.group({
      nombreEquipo: ['', Validators.required],
    });
    this.fetchEquiposCategoria();
    this.refreshService.getSubject().subscribe(() => this.fetchEquiposCategoria());
  }
  fetchEquiposCategoria() {
    this.torneoService.getEquiposCategoria(this.idCategoria).subscribe(
      categoriaInfo => {
        this.equipos = categoriaInfo.equipos;
        this.canInscribe = categoriaInfo.permitirinscripcion === 'Si';
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error.error);
        await alert.present();
      }
    );
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }
  async presentConfirmAlert(nombreEquipo: string, handlerFunction) {
    const alert = await this.alertController.create({
      header: 'Confirmar inscripción',
      message: `¿Estás seguro de que quieres inscribirte con el equipo ${nombreEquipo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            handlerFunction();
          }
        },
      ],
    });
    await alert.present();
  }
  async presentSuccessAlert(nombreEquipo) {
    const alert = await this.alertController.create({
      header: 'Jugador inscrito',
      message: `Te has inscrito con éxito en la categoría con el equipo ${nombreEquipo}`,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
      translucent: true,
    });
    await alert.present();
  }
  async requestInscription(idEquipo, nombreEquipo) {
    await this.presentConfirmAlert(nombreEquipo, () => {
      this.torneoService.requestInscription(this.idCategoria, idEquipo).subscribe(
        async () => {
          await this.presentSuccessAlert(nombreEquipo);
          this.refreshService.emitValue();
        },
        async error => {
          const alert = await this.errorService.createErrorAlert(error.error);
          await alert.present();
        }
      );
    });
  }
  showNewEquipoForm() {
    this.showForm = true;
  }
  async onSubmit(form) {
    if (this.newEquipoForm.status === 'VALID') {
      await this.presentConfirmAlert(form.nombreEquipo, () => {
        this.torneoService.requestNewTeamInscription(this.idCategoria, form.nombreEquipo).subscribe(
          async () => {
            await this.presentSuccessAlert(form.nombreEquipo);
            this.refreshService.emitValue();
          },
          async error => {
            const alert = await this.errorService.createErrorAlert(error.error);
            await alert.present();
          }
        );
      });
    }
  }

}
