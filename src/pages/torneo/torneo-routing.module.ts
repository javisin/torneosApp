import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TorneoPage } from './torneo.page';
const routes: Routes = [
  {
    path: ':id',
    component: TorneoPage,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneosPageRoutingModule {}
