import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IonSlides} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-torneos',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  @ViewChild('scroll', {static: true}) scroll: ElementRef;
  public navIndex: number;
  public idTorneo: string;
  constructor(private route: ActivatedRoute,
              private screenOrientation: ScreenOrientation) {
    this.navIndex = 1;
  }
  async ionViewWillEnter() {
    this.screenOrientation.unlock();
    this.scroll.nativeElement.scrollTop = document.getElementById('aqui').offsetTop;
  }
  async ionViewWillLeave() {
    await this.screenOrientation.lock('portrait');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idTorneo = params.id;
    });
  }

  changeSlideIndex() {
    this.slides.getActiveIndex().then(index => {
      this.navIndex = index;
    });
  }
  async changeSlide(index: number) {
    await this.slides.slideTo(index);
  }

}
