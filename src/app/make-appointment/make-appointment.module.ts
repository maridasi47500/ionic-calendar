import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MakeAppointmentPageRoutingModule } from './make-appointment-routing.module';

import { MakeAppointmentPage } from './make-appointment.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
        ReactiveFormsModule,

    MakeAppointmentPageRoutingModule
  ],
  declarations: [MakeAppointmentPage]
})
export class MakeAppointmentPageModule {}
