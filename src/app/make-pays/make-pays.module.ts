import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakePaysPageRoutingModule } from './make-pays-routing.module';

import { MakePaysPage } from './make-pays.page';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MakePaysPageRoutingModule
  ],
  declarations: [MakePaysPage]
})
export class MakePaysPageModule {}
