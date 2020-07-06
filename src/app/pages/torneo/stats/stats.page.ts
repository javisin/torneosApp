import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonSlides, PickerController, Platform, PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {UserService} from '../../../services/user/user.service';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {Categoria} from '../../../services/torneo/categoria';
import {ErrorService} from '../../../services/error/error.service';
import {SelectCategoriaComponent} from './select-categoria/select-categoria.component';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  @ViewChild('scroll', {static: true}) scroll: ElementRef;
  public navIndex: number;
  public idTorneo: string;
  public idCategoria: string;
  public categoriaDetails: Categoria;
  public idEquipo: string;
  public categoriaType: string;
  constructor(private route: ActivatedRoute,
              private screenOrientation: ScreenOrientation,
              private torneoService: TorneoService,
              private errorService: ErrorService,
              private pickerController: PickerController,
              private popoverController: PopoverController,
              private platform: Platform,
              private router: Router) {
    this.navIndex = 1;
  }
  async ionViewWillEnter(): Promise<void> {
    await this.slides.update();
    this.screenOrientation.unlock();
  }
  ionViewWillLeave(): void {
    this.screenOrientation.lock('portrait');
  }
  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.parent.params.id;
    this.torneoService.getCategoria(this.idCategoria).subscribe(
      async categoria => {
        this.categoriaDetails = categoria;
        this.categoriaType = categoria.tipo;
        this.idTorneo = categoria.idTorneo;
        this.idEquipo = categoria.idEquipo;
        if (this.idEquipo) {
          this.checkJornadaActiva(this.categoriaDetails.jornadaActiva);
        } else {
          const Swiper = await this.slides.getSwiper();
          Swiper.removeSlide(1);
        }
      },
      async error => {
        const alert = await this.errorService.createErrorAlert(error.error, error.status);
        await alert.present();
      });
  }
  checkJornadaActiva(jornada: string): void {
    const interval  = setInterval(() => {
      setTimeout(() => clearInterval(interval), 5000);
      if (document.getElementById(jornada)) {
        this.scroll.nativeElement.scrollTop = document.getElementById(jornada).offsetTop;
        clearInterval(interval);
      }
    }, 100);
  }
  changeSlideIndex(): void {
    this.slides.getActiveIndex().then(index => {
      this.navIndex = index;
    });
  }
  async changeSlide(index: number): Promise<void> {
    await this.slides.slideTo(index);
  }
  async selectCategorias() {
    if (this.platform.is('android')) {
      await this.presentPopover();
    } else {
      await this.openPicker();
    }
  }
  async presentPopover(): Promise<void> {
    const popover = await this.popoverController.create({
      component: SelectCategoriaComponent,
      componentProps: {
        idTorneo: this.idTorneo
      },
      cssClass: 'ionic-h-90 ionic-w-95',
      translucent: true
    });
    return await popover.present();
  }
  async openPicker(): Promise<void> {
    const picker = await this.pickerController.create({
      columns: [{
        name: 'categorias',
        options: await this.getCategoriasForPicker()
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (selection) => {
            this.router.navigate([`/torneo/${selection.categorias.value}`]);
          }
        }
      ]
    });
    await picker.present();
  }
  async getCategoriasForPicker(): Promise<{text: string, value: string}[]> {
    const categorias = await this.torneoService.getCategorias(this.idTorneo).pipe().toPromise();
    return categorias.map(categoria => {
      return {
        text: categoria.nombre,
        value: categoria.id
      };
    });
  }
}
