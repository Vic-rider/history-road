import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home-management/home-management.module').then(
      m => m.HomeManagementModule
    )
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(
      m => m.AuthModule
    )
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
