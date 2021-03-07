import { RejectedComponent } from './rejected/rejected.component';
import { PendingComponent } from './pending/pending.component';
import { ApprovedComponent } from './approved/approved.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoansPage } from './loans.page';

const routes: Routes = [
  {
    path: '',
    component: LoansPage,
    children: [
        {
            path: '',
            redirectTo: 'approved',
            pathMatch: 'full'
        },
        { path: 'approved', component: ApprovedComponent },
        { path: 'pending', component: PendingComponent },
        { path: 'rejected', component: RejectedComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoansPageRoutingModule {}
