import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeLieuPage } from './make-lieu.page';

const routes: Routes = [
  {
    path: '',
    component: MakeLieuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeLieuPageRoutingModule {}
