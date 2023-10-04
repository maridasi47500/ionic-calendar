import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakePaysPage } from './make-pays.page';

const routes: Routes = [
  {
    path: '',
    component: MakePaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakePaysPageRoutingModule {}
