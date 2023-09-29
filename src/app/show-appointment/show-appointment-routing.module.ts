import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowAppointmentPage } from './show-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: ShowAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowAppointmentPageRoutingModule {}
