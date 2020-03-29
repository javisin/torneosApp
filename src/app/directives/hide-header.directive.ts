import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  OnInit,
} from '@angular/core';
import {DomController} from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {
  private currentScroll: number;
  constructor(
      private el: ElementRef,
      private renderer: Renderer2,
      private dom: DomController) {
    this.currentScroll = 0;
  }
  @Input() nav: HTMLElement;
  ngOnInit() {
    this.dom.write(() => {
      this.renderer.setStyle(this.nav, 'transition', 'margin-top 500ms');
    });
  }

  @HostListener('scroll') onScroll() {
    console.log('dentro');
    if (this.el.nativeElement.scrollTop > this.currentScroll) {
      this.dom.write(() => {
        this.renderer.setStyle(this.nav, 'margin-top', `-${ this.nav.clientHeight }px`);
      });
    } else {
      this.dom.write(() => {
        this.renderer.setStyle(this.nav, 'margin-top', '0');
      });
    }
    this.currentScroll = this.el.nativeElement.scrollTop;
  }
}
