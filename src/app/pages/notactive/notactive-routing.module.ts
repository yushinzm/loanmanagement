import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotactivePage } from './notactive.page';

const routes: Routes = [
  {
    path: '',
    component: NotactivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotactivePageRoutingModule {}
