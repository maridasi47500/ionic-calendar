import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowPaysPageRoutingModule } from './show-pays-routing.module';

import { ShowPaysPage } from './show-pays.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowPaysPageRoutingModule
  ],
  declarations: [ShowPaysPage]
})
export class ShowPaysPageModule {}
