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
  qrResultString: string | null = null;

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
  }

  // Método que se ejecuta cuando se escanea un código QR
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log('Resultado del código QR:', this.qrResultString);

    try {
      // Convertimos el QR a JSON para obtener los datos
      const qrData = JSON.parse(resultString);
      const cursoId = qrData.curso_id;
      const alumnoId = this.receivedId;

      if (alumnoId !== undefined && cursoId) {
        // Primero, obtenemos el profesor ID basado en el curso ID
        this.consumoAPI.obtenerProfesorPorCurso(cursoId).subscribe(
          (profesorData: any) => {
            const profesorId = profesorData.profesor_id;

            // Ahora que tenemos profesorId, actualizamos la asistencia
            this.consumoAPI.actualizarAsistencia(profesorId, cursoId, alumnoId).subscribe(
              () => console.log('Asistencia actualizada correctamente en el backend'),
              (error) => console.error('Error al actualizar asistencia:', error)
            );
          },
          (error) => {
            console.error('Error al obtener el ID del profesor:', error);
          }
        );
      } else {
        console.error('ID de alumno o datos del QR no definidos');
      }
    } catch (error) {
      console.error('Error al procesar el QR:', error);
    }
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
