import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ingles1Page } from './ingles-1.page';

const routes: Routes = [
  {
    path: '',
    component: Ingles1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ingles1PageRoutingModule {}
