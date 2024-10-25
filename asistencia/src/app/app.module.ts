import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importar CUSTOM_ELEMENTS_SCHEMA
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode'; // Para generar QR, si lo necesitas
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importamos el escáner QR

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    QRCodeModule,       // Para generar QR (opcional, si lo usas)
    ZXingScannerModule  // Para escanear QR
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Añadir CUSTOM_ELEMENTS_SCHEMA aquí
})
export class AppModule {}
