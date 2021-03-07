import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLoanPageRoutingModule } from './add-loan-routing.module';

import { AddLoanPage } from './add-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLoanPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddLoanPage]
})
export class AddLoanPageModule {}
