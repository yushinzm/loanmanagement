import { ApprovedAgentsComponent } from './approved-agents/approved-agents.component';
import { PendingAgentsComponent } from './pending-agents/pending-agents.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentsPageRoutingModule } from './agents-routing.module';

import { AgentsPage } from './agents.page';
import { AgGridModule } from 'ag-grid-angular';
import { AllMaterialModule } from 'src/app/universal/material-modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentsPageRoutingModule,
    AgGridModule.withComponents([]),
    AllMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AgentsPage,
    PendingAgentsComponent,
    ApprovedAgentsComponent,
  ]
})
export class AgentsPageModule {}
