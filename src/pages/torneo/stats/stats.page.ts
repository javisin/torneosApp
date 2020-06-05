import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonSlides, PickerController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {UserService} from '../../../services/user/user.service';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {Categoria} from '../../../services/torneo/categoria';
import {ErrorService} from '../../../services/alert/error.service';
@Component({
  selector: 'app-torneos',
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
              private userService: UserService,
              private torneoService: TorneoService,
              private errorService: ErrorService,
              private pickerController: PickerController,
              private router: Router) {
    this.navIndex = 1;
  }
  async ionViewWillEnter() {
    await this.slides.update();
    this.screenOrientation.unlock();
  }
  async ionViewWillLeave() {
    await this.screenOrientation.lock('portrait');
  }

  ngOnInit() {
    this.idCategoria = this.route.snapshot.parent.params.id;
    this.torneoService.getCategoria(this.idCategoria).subscribe(
      async categoria => {
        await this.errorService.checkErrors(categoria);
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
        const alert = await this.errorService.createErrorAlert(error);
        await alert.present();
      });
  }
  checkJornadaActiva(jornada: string) {
    const interval  = setInterval(() => {
      setTimeout(() => clearInterval(interval), 5000);
      if (document.getElementById(jornada)) {
        this.scroll.nativeElement.scrollTop = document.getElementById(jornada).offsetTop;
        clearInterval(interval);
      }
    }, 100);
  }
  changeSlideIndex() {
    this.slides.getActiveIndex().then(index => {
      this.navIndex = index;
    });
  }
  async changeSlide(index: number) {
    await this.slides.slideTo(index);
  }
  async openPicker() {
    const picker = await this.pickerController.create({
      columns: [{
        name: 'Categorías',
        options: await this.getCategorias()
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (selection) => {
            this.router.navigate([`/torneo/${selection.Categorías.value}`]);
          }
        }
      ]
    });
    await picker.present();
  }
  async getCategorias() {
    const categorias = await this.torneoService.getCategorias(this.idTorneo).pipe().toPromise();
    return categorias.map(categoria => {
      return {
        text: categoria.nombre,
        value: categoria.id
      };
    });
  }

}
