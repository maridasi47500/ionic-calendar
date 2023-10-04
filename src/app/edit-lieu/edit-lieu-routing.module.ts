import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLieuPage } from './edit-lieu.page';

const routes: Routes = [
  {
    path: '',
    component: EditLieuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLieuPageRoutingModule {}
