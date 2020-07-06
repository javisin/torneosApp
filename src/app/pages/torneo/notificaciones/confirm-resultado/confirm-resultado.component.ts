import {Component, Input, OnInit} from '@angular/core';
import {AlertController, PopoverController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {RefreshService} from '../../../../services/refresh/refresh.service';
import {ErrorService} from '../../../../services/error/error.service';

@Component({
  selector: 'app-confirm-resultado',
  templateUrl: './confirm-resultado.component.html',
  styleUrls: ['./confirm-resultado.component.scss'],
})
export class ConfirmResultadoComponent implements OnInit {
  @Input() idPartido: string;
  @Input() idCategoria: string;
  @Input() idValidacion: string;
  @Input() equipo1: string;
  @Input() equipo2: string;
  @Input() result1: string;
  @Input() result2: string;
  public confirmResultForm: FormGroup;

  constructor(private popoverController: PopoverController,
              private formBuilder: FormBuilder,
              private torneoService: TorneoService,
              private alertController: AlertController,
              private toastController: ToastController,
              private errorService: ErrorService,
              private refreshService: RefreshService) { }
  ngOnInit(): void {
    this.confirmResultForm = this.formBuilder.group({
      idpartido: this.idPartido,
      idcategoria: this.idCategoria,
      idvalidacion: this.idValidacion,
      validar: ['', Validators.required],
      textonok: '',
    });
  }
  async dismissPopover(status: string): Promise<void> {
    if (status === 'NOK') {
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
    if (this.confirmResultForm.status === 'VALID') {
      this.torneoService.validateResultado(form).subscribe(
        async () => {
          await this.dismissPopover(form.validar);
          const toast = await this.toastController.create({
            message: 'Respuesta enviada.',
            duration: 2000,
            position: 'top'
          });
          await toast.present();
        },
        async error => {
          await this.dismissPopover('E');
          const alert = await this.errorService.createErrorAlert(error.error, error.status);
          await alert.present();
        }
      );
    }
  }
}
