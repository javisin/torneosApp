import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscribirsePage } from './inscribirse.page';

const routes: Routes = [
  {
    path: '',
    component: InscribirsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscribirsePageRoutingModule {}
