import {Component, Input, OnInit} from '@angular/core';
import {AlertController, PopoverController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TorneoService} from '../../../../services/torneo/torneo.service';

@Component({
  selector: 'app-confirm-resultado',
  templateUrl: './confirm-resultado.component.html',
  styleUrls: ['./confirm-resultado.component.scss'],
})
export class ConfirmResultadoComponent implements OnInit {
  @Input() idPartido: string;
  @Input() idCategoria: string;
  @Input() equipo1: string;
  @Input() equipo2: string;
  @Input() result1: string;
  @Input() result2: string;
  public confirmResultForm: FormGroup;

  constructor(private popoverController: PopoverController,
              private formBuilder: FormBuilder,
              private torneoService: TorneoService,
              private alertController: AlertController) { }

  ngOnInit() {
    this.confirmResultForm = this.formBuilder.group({
      idpartido: this.idPartido,
      idcategoria: this.idCategoria,
      validar: ['', Validators.required],
      textonok: '',
    });
  }
  async dismissPopover(status) {
    await this.popoverController.dismiss(
      {
        notificacionStatus: status,
      }
    );
  }
  get FormControl() {
    return this.confirmResultForm.controls;
  }
  onSubmit(form) {
    this.confirmResultForm.markAllAsTouched();
    if (this.confirmResultForm.status === 'VALID') {
      this.torneoService.validateResultado(form).subscribe(
        async (res) => {
          if (res.Error) {
            const alert = await this.alertController.create({
              header: 'Error',
              message: res.Error,
              buttons: ['OK'],
              translucent: true,
            });
            await alert.present();
            await this.dismissPopover('E');
          } else {
            const alert = await this.alertController.create({
              header: 'Enviado',
              message: 'Respuesta enviada.',
              buttons: ['OK'],
              translucent: true,
            });
            await alert.present();
            await this.dismissPopover(form.validar);
          }
        },
      );
    }
  }
}
