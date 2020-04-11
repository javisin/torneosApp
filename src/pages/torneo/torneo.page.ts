import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  @ViewChild('scroll', {static: true}) scroll: ElementRef;
  public navIndex: number;
  constructor() {
    this.navIndex = 1;
  }
  ionViewWillEnter() {
    this.scroll.nativeElement.scrollTop = document.getElementById('aqui').offsetTop;
  }

  ngOnInit() {
  }

  changeSlideIndex() {
    this.slides.getActiveIndex().then(index => {
      this.navIndex = index;
    });
  }
  changeSlide(index: number) {
    this.slides.slideTo(index);
  }

}
