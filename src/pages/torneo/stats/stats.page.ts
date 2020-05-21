import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonSlides, PickerController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {UserService} from '../../../services/user/user.service';
import {TorneoService} from '../../../services/torneo/torneo.service';
import {Categoria} from '../../../services/torneo/categoria';
@Component({
  selector: 'app-torneos',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  @ViewChild('scroll', {static: true}) scroll: ElementRef;
  public navIndex: number;
  public idCategoria: string;
  public categoriaDetails: Categoria;
  constructor(private route: ActivatedRoute,
              private screenOrientation: ScreenOrientation,
              private userService: UserService,
              private torneoService: TorneoService,
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
    this.torneoService.getCategoria(this.userService.getUser().value, this.idCategoria).subscribe(data => {
      this.categoriaDetails = data;
      this.checkJornadaActiva(this.categoriaDetails.jornadaactiva);
    });
  }
  checkJornadaActiva() {
    const interval  = setInterval(() => {
      if (document.getElementById('18')) {
        this.scroll.nativeElement.scrollTop = document.getElementById('18').offsetTop;
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
  async openPicker(idTorneo) {
    const picker = await this.pickerController.create({
      columns: [{
        name: 'Categorías',
        options: await this.getCategorias(idTorneo)
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (selection) => {
            this.router.navigate([`/torneos/torneo/${selection.Categorías.value}`]);
          }
        }
      ]
    });
    await picker.present();
  }
  async getCategorias(idTorneo) {
    const categorias = await this.torneoService.getCategorias(idTorneo).pipe().toPromise();
    return categorias.map(categoria => {
      return {
        text: categoria.nombre,
        value: categoria.idcategoria
      };
    });
  }

}
