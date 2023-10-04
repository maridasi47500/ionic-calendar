import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLieuPageRoutingModule } from './edit-lieu-routing.module';

import { EditLieuPage } from './edit-lieu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLieuPageRoutingModule
  ],
  declarations: [EditLieuPage]
})
export class EditLieuPageModule {}
