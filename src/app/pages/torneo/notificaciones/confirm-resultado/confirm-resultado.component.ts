import {Component, Input, OnInit} from '@angular/core';
import {AlertController, PopoverController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {RefreshService} from '../../../../services/refresh/refresh.service';
import {AlertService} from '../../../../services/alert/alert.service';

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
              private alertController: AlertController,
              private alertService: AlertService,
              private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.confirmResultForm = this.formBuilder.group({
      idpartido: this.idPartido,
      idcategoria: this.idCategoria,
      validar: ['', Validators.required],
      textonok: '',
    });
  }
  async dismissPopover(status: string): Promise<void> {
    if (status === 'OK') {
      this.refreshService.emitValue();
    }
    await this.popoverController.dismiss(
      {
        notificacionStatus: status,
      }
    );
  }
  get FormControl() {
    return this.confirmResultForm.controls;
  }
  onSubmit(form): void {
    this.confirmResultForm.markAllAsTouched();
    if (this.confirmResultForm.status === 'VALID') {
      this.torneoService.validateResultado(form).subscribe(
        async () => {
            const alert = await this.alertController.create({
              header: 'Enviado',
              message: 'Respuesta enviada.',
              buttons: ['OK'],
              translucent: true,
            });
            await alert.present();
            await this.dismissPopover(form.validar);
        },
        async error => {
          const alert = await this.alertService.createErrorAlert(error.error, error.status);
          await alert.present();
        }
      );
    }
  }
}
