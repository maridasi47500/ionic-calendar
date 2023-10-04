import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowLieuPageRoutingModule } from './show-lieu-routing.module';

import { ShowLieuPage } from './show-lieu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowLieuPageRoutingModule
  ],
  declarations: [ShowLieuPage]
})
export class ShowLieuPageModule {}
