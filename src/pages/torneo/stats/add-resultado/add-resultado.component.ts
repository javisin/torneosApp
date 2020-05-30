import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TorneoService} from '../../../../services/torneo/torneo.service';

@Component({
  selector: 'app-add-result',
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
              private alertController: AlertController) { }

  ngOnInit() {
    if (this.type === '1') {
      this.resultForm = this.formBuilder.group({
        txtrdo11: ['', Validators.required],
        txtrdo12: ['', Validators.required],
        txtrdo13: ['', Validators.required],
        txtrdo14: ['', Validators.required],
        txtrdo15: ['', Validators.required],
        txtdatos1: ['', Validators.required],
        txtrdo21: ['', Validators.required],
        txtrdo22: ['', Validators.required],
        txtrdo23: ['', Validators.required],
        txtrdo24: ['', Validators.required],
        txtrdo25: ['', Validators.required],
        txtdatos2: ['', Validators.required],
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
          txtrdo12: ['', Validators.required],
          txtrdo13: ['', Validators.required],
          txtrdo14: ['', Validators.required],
          txtrdo15: ['', Validators.required],
          txtrdo21: ['', Validators.required],
          txtrdo22: ['', Validators.required],
          txtrdo23: ['', Validators.required],
          txtrdo24: ['', Validators.required],
          txtrdo25: ['', Validators.required],
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
  async dismissModal() {
    await this.modalController.dismiss();
  }
  async onSubmit(form) {
    if (this.resultForm.status === 'VALID') {
      this.torneoService.setResult(form, this.type).subscribe(
        async (res) => {
          await this.dismissModal();
          if (res.Error) {
            const alert = await this.alertController.create({
              header: 'Error',
              message: res.Error,
              buttons: ['OK'],
              translucent: true,
            });
            await alert.present();
          } else {
            const alert = await this.alertController.create({
              header: 'Enviado',
              message: 'Solicitud enviada con éxito.',
              buttons: ['OK'],
              translucent: true,
            });
            await alert.present();
          }
        },
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
