import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoapiService } from '../service/consumoapi.service'; 
import { AlertController } from '@ionic/angular';  

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

  // Función para mostrar el alert de confirmación
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
