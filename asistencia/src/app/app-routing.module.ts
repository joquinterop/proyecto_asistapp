import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AsignaturaPage } from './asignatura/asignatura.page';
import { guardGuard } from './guard/guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [guardGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'professor-profile',
    loadChildren: () => import('./professor-profile/professor-profile.module').then(m => m.ProfessorProfilePageModule),
    canActivate: [guardGuard]
  },
  {
    path: 'student-profile',
    loadChildren: () => import('./student-profile/student-profile.module').then(m => m.StudentProfilePageModule),
    canActivate: [guardGuard]
  },
  {
    path: 'ingles-1',
    loadChildren: () => import('./ingles-1/ingles-1.module').then(m => m.Ingles1PageModule),
    canActivate: [guardGuard]
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./generar-qr/generar-qr.module').then(m => m.GenerarQrPageModule),
    canActivate: [guardGuard]
  },
  {
    path: 'asignatura',
    loadChildren: () => import('./asignatura/asignatura.module').then(m => m.AsignaturaPageModule),
    canActivate: [guardGuard]
  },
  {
    path: 'reiniciar-contrasena',
    loadChildren: () => import('./reiniciar-contrasena/reiniciar-contrasena.module').then( m => m.ReiniciarContrasenaPageModule),
    canActivate: [guardGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./error-404/error-404.module').then( m => m.Error404PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
