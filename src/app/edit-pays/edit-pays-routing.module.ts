import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPaysPage } from './edit-pays.page';

const routes: Routes = [
  {
    path: '',
    component: EditPaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPaysPageRoutingModule {}
