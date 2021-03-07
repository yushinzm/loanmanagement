import { ApprovedClientsComponent } from './approved-clients/approved-clients.component';
import { PendingClientsComponent } from './pending-clients/pending-clients.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { ClientsPage } from './clients.page';
import { AgGridModule } from 'ag-grid-angular';
import { AllMaterialModule } from 'src/app/universal/material-modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsPageRoutingModule,
    AgGridModule.withComponents([]),
    AllMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ClientsPage,
    PendingClientsComponent,
    ApprovedClientsComponent,
  ]
})
export class ClientsPageModule { }
