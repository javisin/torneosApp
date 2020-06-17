import { Component, OnInit } from '@angular/core';
import {NotificacionService} from '../../services/notificacion/notificacion.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {IonRouterOutlet} from '@ionic/angular';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {
  public notificacionesLength: number;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private notificacionService: NotificacionService,
              private nativePageTransitions: NativePageTransitions,
              private ionRouterOutlet: IonRouterOutlet) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user = this.userService.getUser().getValue();
      this.notificacionService.getNotificaciones(user, params.id).subscribe(notificaciones => {
        this.notificacionesLength = notificaciones.filter(notificacion => notificacion.estado === '0').length;
      });
    });
  }
  ionViewWillLeave(): void {
    if (this.ionRouterOutlet.getLastUrl() === '/torneos') {
      const options: NativeTransitionOptions = {
        direction: 'right',
        duration: 400,
        slowdownfactor: -1,
        iosdelay: 50,
        androiddelay: 50,
      };
      this.nativePageTransitions.slide(options);
    }
  }
}
