import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
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
              private torneoService: TorneoService) { }

  ngOnInit() {
    this.confirmResultForm = this.formBuilder.group({
      idpartido: this.idPartido,
      idcategoria: this.idCategoria,
      validar: ['', Validators.required],
      textonok: '',
    });
  }
  async dismissPopover() {
    await this.popoverController.dismiss();
  }
  onSubmit(form) {
    if (this.confirmResultForm.status === 'VALID') {
      this.torneoService.validateResultado(form).subscribe(
        data => console.log(data)
      );
    }
  }
}
