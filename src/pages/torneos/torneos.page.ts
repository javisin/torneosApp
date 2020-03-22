import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {
  torneos: any[];

  constructor(private appService: AppService) {
  }

  ngOnInit() {
      this.appService.getTorneos('demoapp3').subscribe(res => {
          this.torneos = Object.values(res);
          this.torneos.splice(0, 1); // Intentar resolver de otro modo
      });
  }

}
