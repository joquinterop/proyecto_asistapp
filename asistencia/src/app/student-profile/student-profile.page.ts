import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoapiService } from '../service/consumoapi.service'; 
import { AlertController } from '@ionic/angular';  
import { ZXingScannerComponent } from '@zxing/ngx-scanner'; // Importamos la biblioteca de escaneo QR

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {
  nombre: string | undefined;
  receivedId: number | undefined;
  fotoPerfil: string | undefined;
  correo: string | undefined;
  qrResultString: string | null = null; // Aquí almacenaremos el resultado del escaneo

  constructor(
    private router: Router,
    private consumoAPI: ConsumoapiService, 
    private alertController: AlertController  
  ) {}

  ngOnInit(): void {
    // Obtenemos los datos del estudiante desde el estado del login
    if (history.state) {
      this.nombre = history.state.nombre;
      this.receivedId = history.state.id;
      this.fotoPerfil = history.state.fotoPerfil;
      this.correo = history.state.correo;
    }
  }

  // Este método se ejecuta cuando se escanea un código QR
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log('Resultado del código QR:', this.qrResultString);
    // Puedes agregar aquí la lógica para procesar el código escaneado
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Confirmar cierre de sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            localStorage.clear(); 
            this.router.navigate(['/login']);  
          }
        }
      ]
    });

    await alert.present();
  }
}
