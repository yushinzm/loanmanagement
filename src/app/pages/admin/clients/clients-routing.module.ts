import { PendingClientsComponent } from './pending-clients/pending-clients.component';
import { ApprovedClientsComponent } from './approved-clients/approved-clients.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsPage } from './clients.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage,
    children: [
        {
            path: '',
            redirectTo: 'approvedClients',
            pathMatch: 'full'
        },
        { path: 'approvedClients', component: ApprovedClientsComponent },
        { path: 'pendingClients', component: PendingClientsComponent },
    ]
  },
  {
    path: 'approve-client',
    loadChildren: () => import('./approve-client/approve-client.module').then( m => m.ApproveClientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsPageRoutingModule {}
