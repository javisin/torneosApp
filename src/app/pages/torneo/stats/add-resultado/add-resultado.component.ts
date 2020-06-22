import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {RefreshService} from '../../../../services/refresh/refresh.service';
import {ErrorService} from '../../../../services/error/error.service';

@Component({
  selector: 'app-add-resultado',
  templateUrl: './add-resultado.component.html',
  styleUrls: ['./add-resultado.component.scss'],
})
export class AddResultadoComponent implements OnInit {
  @Input() nombreEquipo1: string;
  @Input() nombreEquipo2: string;
  @Input() idEquipo1: string;
  @Input() idEquipo2: string;
  @Input() jornada: string;
  @Input() idCategoria: string;
  @Input() idPartido: string;
  @Input() modality: string;
  @Input() type: string;
  public resultForm: FormGroup;

  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder,
              private torneoService: TorneoService,
              private errorService: ErrorService,
              private alertController: AlertController,
              private refreshService: RefreshService) { }
  ngOnInit(): void {
    if (this.type === '1') {
      this.resultForm = this.formBuilder.group({
        txtrdo11: ['', Validators.required],
        txtrdo12: '',
        txtrdo13: '',
        txtrdo14: '',
        txtrdo15: '',
        txtdatos1: '',
        txtrdo21: ['', Validators.required],
        txtrdo22: '',
        txtrdo23: '',
        txtrdo24: '',
        txtrdo25: '',
        txtdatos2: '',
        equipoganador: ['', Validators.required],
        idequipo1: this.idEquipo1,
        idequipo2: this.idEquipo2,
        idtorneo: this.idCategoria,
        njornada: this.jornada,
        idpartido: this.idPartido,
      });
    } else {
      if (this.modality === 'sets') {
        this.resultForm = this.formBuilder.group({
          txtrdo11: ['', Validators.required],
          txtrdo12: '',
          txtrdo13: '',
          txtrdo14: '',
          txtrdo15: '',
          txtrdo21: ['', Validators.required],
          txtrdo22: '',
          txtrdo23: '',
          txtrdo24: '',
          txtrdo25: '',
          equipoganador: ['', Validators.required],
          idequipo1: this.idEquipo1,
          idequipo2: this.idEquipo2,
          idtorneo: this.idCategoria,
          njornada: this.jornada,
          idpartido: this.idPartido,
        });
      } else {
        this.resultForm = this.formBuilder.group({
          txtrdo11: ['', Validators.required],
          txtrdo21: ['', Validators.required],
          idequipo1: this.idEquipo1,
          idequipo2: this.idEquipo2,
          idtorneo: this.idCategoria,
          njornada: this.jornada,
          idpartido: this.idPartido,
        });
      }
    }
  }
  async dismissModal(): Promise<void>  {
    await this.modalController.dismiss();
  }
  async onSubmit(form): Promise<void>  {
    if (this.resultForm.status === 'VALID') {
      this.torneoService.setResult(form, this.type).subscribe(
        async () => {
          await this.dismissModal();
          const alert = await this.alertController.create({
            header: 'Enviado',
            message: 'Resultado guardado con éxito.',
            buttons: ['OK'],
            translucent: true,
          });
          await alert.present();
          this.refreshService.emitValue();
        },
        async error => {
          const alert = await this.errorService.createErrorAlert(error.error);
          await alert.present();
        }
      );
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, rellena todos los campos.',
        buttons: ['OK'],
        translucent: true,
      });
      await alert.present();
    }
  }
}
