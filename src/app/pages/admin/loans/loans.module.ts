import { ApprovedLoansComponent } from './approved-loans/approved-loans.component';
import { RejectedLoansComponent } from './rejected-loans/rejected-loans.component';
import { PendingLoansComponent } from './pending-loans/pending-loans.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoansPageRoutingModule } from './loans-routing.module';

import { LoansPage } from './loans.page';
import { AgGridModule } from 'ag-grid-angular';
import { AllMaterialModule } from 'src/app/universal/material-modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoansPageRoutingModule,
    AgGridModule.withComponents([]),
    AllMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoansPage,
    PendingLoansComponent,
    RejectedLoansComponent,
    ApprovedLoansComponent,
  ]
})
export class LoansPageModule {}
