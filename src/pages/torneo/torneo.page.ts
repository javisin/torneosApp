import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IonContent, IonSlides} from '@ionic/angular';
import {HideHeaderDirective} from '../../app/directives/hide-header.directive';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {
  @ViewChild(IonContent, {static: true}) content: IonContent;
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  // @ViewChild('point', {static: false}) div: ElementRef;
  public navIndex: number;
  constructor() {
    this.navIndex = 1;
  }
  ngOnInit() {
  }
  // ionViewWillEnter() {
  //   this.div.nativeElement.scrollTop = 200;;
  // }

  changeSlideIndex() {
    this.slides.getActiveIndex().then(index => {
      this.navIndex = index;
    });
  }
  changeSlide(index: number) {
    this.slides.slideTo(index);
  }

}
