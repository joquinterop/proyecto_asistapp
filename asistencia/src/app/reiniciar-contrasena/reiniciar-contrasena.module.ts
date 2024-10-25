import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReiniciarContrasenaPageRoutingModule } from './reiniciar-contrasena-routing.module';

import { ReiniciarContrasenaPage } from './reiniciar-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReiniciarContrasenaPageRoutingModule
  ],
  declarations: [ReiniciarContrasenaPage]
})
export class ReiniciarContrasenaPageModule {}
