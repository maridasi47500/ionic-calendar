import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowLieuPage } from './show-lieu.page';

const routes: Routes = [
  {
    path: '',
    component: ShowLieuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowLieuPageRoutingModule {}
