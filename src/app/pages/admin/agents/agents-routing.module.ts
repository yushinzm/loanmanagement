import { PendingAgentsComponent } from './pending-agents/pending-agents.component';
import { ApprovedAgentsComponent } from './approved-agents/approved-agents.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentsPage } from './agents.page';

const routes: Routes = [
  {
    path: '',
    component: AgentsPage,
    children: [
        {
            path: '',
            redirectTo: 'approvedAgents',
            pathMatch: 'full'
        },
        { path: 'approvedAgents', component: ApprovedAgentsComponent },
        { path: 'pendingAgents', component: PendingAgentsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentsPageRoutingModule {}
