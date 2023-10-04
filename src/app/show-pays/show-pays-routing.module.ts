import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowPaysPage } from './show-pays.page';

const routes: Routes = [
  {
    path: '',
    component: ShowPaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowPaysPageRoutingModule {}
