import { ApprovedLoansComponent } from './approved-loans/approved-loans.component';
import { PendingLoansComponent } from './pending-loans/pending-loans.component';
import { RejectedLoansComponent } from './rejected-loans/rejected-loans.component';
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
            redirectTo: 'approvedLoans',
            pathMatch: 'full'
        },
        { path: 'approvedLoans', component: ApprovedLoansComponent },
        { path: 'pendingLoans', component: PendingLoansComponent },
        { path: 'rejectedLoans', component: RejectedLoansComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoansPageRoutingModule {}
