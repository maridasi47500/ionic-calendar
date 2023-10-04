import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeLieuPageRoutingModule } from './make-lieu-routing.module';

import { MakeLieuPage } from './make-lieu.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MakeLieuPageRoutingModule
  ],
  declarations: [MakeLieuPage]
})
export class MakeLieuPageModule {}
