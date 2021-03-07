import { RejectedComponent } from './rejected/rejected.component';
import { PendingComponent } from './pending/pending.component';
import { ApprovedComponent } from './approved/approved.component';
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
    ApprovedComponent,
    PendingComponent,
    RejectedComponent
  ]
})
export class LoansPageModule { }
