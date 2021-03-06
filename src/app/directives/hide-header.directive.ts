import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  OnInit,
} from '@angular/core';
import {DomController} from '@ionic/angular';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {
  private currentScroll: number;
  private visible: boolean;
  private scrollDown: boolean;
  private maxScroll: number;
  private scrollDivs: NodeListOf<HTMLElement>;
  constructor(
      private el: ElementRef,
      private renderer: Renderer2,
      private dom: DomController,
      private screenOrientation: ScreenOrientation,
  ) {
    this.currentScroll = 0;
    this.maxScroll = 0;
    this.visible = true;
  }
  @Input() nav: HTMLElement;
  ngOnInit() {
    this.scrollDivs = document.querySelectorAll('.scrollable');
    this.dom.write(() => {
      this.renderer.setStyle(this.nav, 'transition', 'margin-top 500ms');
      this.scrollDivs.forEach(scroll => {
        this.renderer.setStyle(scroll, 'transition', 'height 500ms');
      });
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.screenOrientation.type.includes('landscape')) {
      this.hideHeader();
    } else if (this.screenOrientation.type.includes('portrait')) {
      this.showHeader();
    }
  }

  @HostListener('scroll') onScroll() {
    this.maxScroll = this.el.nativeElement.scrollHeight - this.el.nativeElement.clientHeight;
    this.scrollDown = this.el.nativeElement.scrollTop > this.currentScroll;
    if (this.scrollDown && this.visible && this.el.nativeElement.scrollTop > 200) {
      this.hideHeader();
    } else if (!this.scrollDown && !this.visible && !this.screenOrientation.type.includes('landscape')
        && this.el.nativeElement.scrollTop < (this.maxScroll - 100)) {
      this.showHeader();
    }
    this.currentScroll = this.el.nativeElement.scrollTop;
  }
  hideHeader() {
    this.visible = false;
    this.scrollDivs = document.querySelectorAll('.scrollable');
    this.dom.write(() => {
      this.renderer.setStyle(this.nav, 'margin-top', `-${ this.nav.clientHeight }px`);
      this.scrollDivs.forEach(scroll => {
        this.renderer.setStyle(scroll, 'height', 'calc(100vh - 94px)');
      });
    });
  }
  showHeader() {
    this.visible = true;
    this.scrollDivs = document.querySelectorAll('.scrollable');
    this.dom.write(() => {
      this.renderer.setStyle(this.nav, 'margin-top', '0');
      this.scrollDivs.forEach(scroll => {
        this.renderer.setStyle(scroll, 'height', 'calc(100vh - 218px)');
      });
    });
  }
}
