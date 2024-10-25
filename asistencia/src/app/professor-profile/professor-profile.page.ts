import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoapiService } from '../service/consumoapi.service';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.page.html',
  styleUrls: ['./professor-profile.page.scss'],
})
export class ProfessorProfilePage implements OnInit {
  nombre: string | undefined;
  receivedId: number | undefined;
  fotoPerfil: string | undefined;
  fecha: string | undefined;
  correo: string | undefined;
  cursos: any[] = [];

  constructor(
    private router: Router, 
    private consumoAPI: ConsumoapiService,
    private alertController: AlertController  
  ) {}

  ngOnInit(): void {
    if (history.state) {
      this.nombre = history.state.nombre;
      this.receivedId = history.state.id;
      this.fotoPerfil = history.state.fotoPerfil;
      this.correo = history.state.correo;
    }

    this.getCursos();
    this.fecha = this.formatearFecha(new Date());
  }

  getCursos() {
    if (this.receivedId) {
      this.consumoAPI.obtenerCursosProfesor(this.receivedId).subscribe(
        (response: any) => {
          this.cursos = response;
        },
        (error: any) => {
          console.error('Error al obtener los cursos del profesor', error);
        }
      );
    }
  }

  formatearFecha(fecha: Date): string {
    const opciones = { day: '2-digit', month: 'short', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', opciones).replace(/\./g, '');
  }

  navegar(curso: any) {
    this.router.navigate(['/asignatura'], { state: { detalles: curso } });
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
            // Acción cuando se confirma el cierre de sesión
            localStorage.clear(); 
            this.router.navigate(['/login']);  
          }
        }
      ]
    });

    await alert.present();
  }
}
