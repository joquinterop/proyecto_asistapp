import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StudentProfilePageRoutingModule } from './student-profile-routing.module';
import { StudentProfilePage } from './student-profile.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importa el módulo del escáner de QR

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentProfilePageRoutingModule,
    ZXingScannerModule  // Asegúrate de agregar el módulo aquí
  ],
  declarations: [StudentProfilePage]
})
export class StudentProfilePageModule {}
