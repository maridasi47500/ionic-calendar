import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowAppointmentPageRoutingModule } from './show-appointment-routing.module';

import { ShowAppointmentPage } from './show-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowAppointmentPageRoutingModule
  ],
  declarations: [ShowAppointmentPage]
})
export class ShowAppointmentPageModule {}
