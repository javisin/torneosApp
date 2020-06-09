import {Component, Input, OnInit} from '@angular/core';
import {TorneoService} from '../../../../services/torneo/torneo.service';
import {ActivatedRoute} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ChangeDetectorRef } from '@angular/core';
import {RefreshService} from '../../../../services/refresh/refresh.service';

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
  public headers: string[];

  constructor(private route: ActivatedRoute,
              private torneoService: TorneoService,
              private screenOrientation: ScreenOrientation,
              private changeRef: ChangeDetectorRef,
              private refreshService: RefreshService) {
    this.headers = [];
  }
  ngOnInit() {
    this.setOrientation();
    this.fetchPositions();
    this.refreshService.getSubject().subscribe(() => {
      this.fetchPositions();
    });
  }
  setOrientation() {
    this.portraitOrientation = this.screenOrientation.type.includes('portrait');
    this.screenOrientation.onChange().subscribe(() => {
      this.portraitOrientation = this.screenOrientation.type.includes('portrait');
      this.changeRef.detectChanges();
    });
  }
  fetchPositions() {
    this.torneoService.getClasificacion(this.idCategoria).subscribe(clasificacion => {
      this.headers = [];
      for (const key in clasificacion.posiciones[0]) {
        if (clasificacion.posiciones[0].hasOwnProperty(key)) {
          this.headers.push(key);
        }
      }
      this.positions = clasificacion.posiciones;
    });
  }
  async toggleOrientation() {
    const orientation = this.screenOrientation.type.includes('portrait') ? 'landscape' : 'portrait';
    await this.screenOrientation.lock(orientation);
    setTimeout(async () => await this.screenOrientation.unlock(), 5000);
  }
}


