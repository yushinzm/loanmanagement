import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveClientPageRoutingModule } from './approve-client-routing.module';

import { ApproveClientPage } from './approve-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveClientPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ApproveClientPage]
})
export class ApproveClientPageModule {}
