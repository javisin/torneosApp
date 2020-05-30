import { Component, OnInit } from '@angular/core';
import {NotificacionService} from '../../services/notificacion/notificacion.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-torneoo',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {
  public notificacionesLength: number;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private notificacionService: NotificacionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const user = this.userService.getUser().getValue();
      this.notificacionService.getNotificaciones(user, params.id).subscribe(notificaciones => {
        this.notificacionesLength = notificaciones.length;
      });
    });
  }
}
