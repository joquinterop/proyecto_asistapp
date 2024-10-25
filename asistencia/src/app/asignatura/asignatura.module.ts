import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AsignaturaPageRoutingModule } from './asignatura-routing.module';
import { AsignaturaPage } from './asignatura.page';

// Importamos el módulo QRCode
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturaPageRoutingModule,
    QRCodeModule  // Añadir el QRCodeModule aquí
  ],
  declarations: [AsignaturaPage]
})
export class AsignaturaPageModule {}
