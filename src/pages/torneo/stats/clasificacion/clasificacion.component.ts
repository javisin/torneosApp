import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {ActivatedRoute} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.scss'],
})
export class ClasificacionComponent implements OnInit {
  @Input() idCategoria: string;
  public test: boolean;
  public portraitOrientation: boolean;
  public positions: any;

  constructor(private route: ActivatedRoute,
              private torneoService: TorneoService,
              private screenOrientation: ScreenOrientation,
              private changeRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.portraitOrientation = this.screenOrientation.type.includes('portrait');
    this.screenOrientation.onChange().subscribe(() => {
      this.portraitOrientation = this.screenOrientation.type.includes('portrait');
      this.changeRef.detectChanges();
    });
    this.torneoService.getClasificacion(this.idCategoria).subscribe(res => {
      this.positions = res.posiciones;
    });
  }
  async toggleOrientation() {
    const orientation = this.screenOrientation.type.includes('portrait') ? 'landscape' : 'portrait';
    await this.screenOrientation.lock(orientation);
    setTimeout(async () => await this.screenOrientation.unlock(), 5000);
  }
}


