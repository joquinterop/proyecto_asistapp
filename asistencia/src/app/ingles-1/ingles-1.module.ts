import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ingles1PageRoutingModule } from './ingles-1-routing.module';

import { Ingles1Page } from './ingles-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ingles1PageRoutingModule
  ],
  declarations: [Ingles1Page]
})
export class Ingles1PageModule {}
