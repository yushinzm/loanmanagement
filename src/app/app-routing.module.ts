import { IsActiveRevGuard } from './guards/is-active-rev.guard';
import { IsActiveGuard } from './guards/is-active.guard';
import { IsClientGuard } from './guards/is-client.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IsNewGuard } from './guards/is-new.guard';
import { IsNotNewGuard } from './guards/is-not-new.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, IsNewGuard, IsActiveGuard, IsAdminGuard],
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'client',
    canActivate: [AuthGuard, IsNewGuard, IsActiveGuard, IsClientGuard],
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'login',
    canActivate: [NotAuthGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'createprofile',
    canActivate: [AuthGuard, IsNotNewGuard],
    loadChildren: () => import('./pages/createprofile/createprofile.module').then( m => m.CreateprofilePageModule)
  },
  {
    path: 'notactive',
    canActivate:[IsActiveRevGuard],
    loadChildren: () => import('./pages/notactive/notactive.module').then( m => m.NotactivePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
