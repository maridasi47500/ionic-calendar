import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'make-appointment',
    loadChildren: () => import('./make-appointment/make-appointment.module').then( m => m.MakeAppointmentPageModule)
  },
  {
    path: 'edit-appointment/:id',
    loadChildren: () => import('./edit-appointment/edit-appointment.module').then( m => m.EditAppointmentPageModule)
  },
  {
    path: 'appointments/:id',
    loadChildren: () => import('./show-appointment/show-appointment.module').then( m => m.ShowAppointmentPageModule)
  },
  {
    path: 'edit-pays/:id',
    loadChildren: () => import('./edit-pays/edit-pays.module').then( m => m.EditPaysPageModule)
  },
  {
    path: 'make-pays',
    loadChildren: () => import('./make-pays/make-pays.module').then( m => m.MakePaysPageModule)
  },
  {
    path: 'pays/:id',
    loadChildren: () => import('./show-pays/show-pays.module').then( m => m.ShowPaysPageModule)
  },
  {
    path: 'make-lieu',
    loadChildren: () => import('./make-lieu/make-lieu.module').then( m => m.MakeLieuPageModule)
  },
  {
    path: 'lieu/:id',
    loadChildren: () => import('./show-lieu/show-lieu.module').then( m => m.ShowLieuPageModule)
  },
  {
    path: 'edit-lieu/:id',
    loadChildren: () => import('./edit-lieu/edit-lieu.module').then( m => m.EditLieuPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
