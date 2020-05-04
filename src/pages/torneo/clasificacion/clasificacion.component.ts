import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {ActivatedRoute} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.scss'],
})
export class ClasificacionComponent implements OnInit {
  @Input() idTorneo: string;
  public test: boolean;
  public portraitOrientation: boolean;
  public position: any;

  constructor(private route: ActivatedRoute,
              private torneoService: TorneoService,
              private screenOrientation: ScreenOrientation,
              private changeRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.portraitOrientation = this.screenOrientation.type === 'portrait-primary';
    this.screenOrientation.onChange().subscribe(() => {
      this.portraitOrientation = this.screenOrientation.type === 'portrait-primary';
      this.changeRef.detectChanges();
    });
    this.torneoService.getClasificacion(this.idTorneo).subscribe(res => {
      this.position = res.posiciones.posicion1;
    });
  }
}


