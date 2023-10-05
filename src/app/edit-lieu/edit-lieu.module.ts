import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLieuPageRoutingModule } from './edit-lieu-routing.module';

import { EditLieuPage } from './edit-lieu.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditLieuPageRoutingModule
  ],
  declarations: [EditLieuPage]
})
export class EditLieuPageModule {}
