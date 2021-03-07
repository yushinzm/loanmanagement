import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotactivePageRoutingModule } from './notactive-routing.module';

import { NotactivePage } from './notactive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotactivePageRoutingModule
  ],
  declarations: [NotactivePage]
})
export class NotactivePageModule {}
