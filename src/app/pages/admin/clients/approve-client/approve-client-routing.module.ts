import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveClientPage } from './approve-client.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveClientPageRoutingModule {}
