import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoapiService } from '../service/consumoapi.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {
  detallesAsignatura: any;
  alumnosAsignatura: any[] = [];
  qrAsignaturaData: string = '';

  constructor(private router: Router, private consumoAPI: ConsumoapiService) {
    // Obtenemos la información del curso desde la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.detallesAsignatura = navigation.extras.state['detalles'];
    }
  }

  ngOnInit() {
    if (this.detallesAsignatura) {
      // Cargar la lista de alumnos de la asignatura
      this.alumnosAsignatura = this.detallesAsignatura.alumnos || [];
      // Generar el código QR para la asignatura
      this.generateQR();
    } else {
      console.error('No se recibieron detalles de la asignatura');
    }
  }

  // Función para generar el código QR
  generateQR() {
    const asignatura = this.detallesAsignatura.nombre;
    const seccion = this.detallesAsignatura.seccion;
    const fecha = format(new Date(), 'yyyy-MM-dd');
    const profesorId = history.state.id;  // Usamos el ID del profesor
    const cursoId = this.detallesAsignatura.id; // ID del curso actual
  
    this.qrAsignaturaData = JSON.stringify({
      profesor_id: profesorId,
      curso_id: cursoId,
      asignatura: asignatura,
      seccion: seccion,
      fecha: fecha,
    });
  
    console.log('QR Code data:', this.qrAsignaturaData);
  }
  

  // Función para actualizar el estado de un alumno al escanear el QR
  actualizarEstadoAlumno(alumnoId: number) {
    const profesorId = history.state.id; // Asegúrate de obtener el ID del profesor desde el perfil
    const cursoId = this.detallesAsignatura.id;

    this.consumoAPI.actualizarAsistencia(profesorId, cursoId, alumnoId).subscribe(
      (response: any) => {
        console.log('Asistencia actualizada:', response);

        // Actualizamos el estado del alumno en la lista local para reflejar el cambio
        const alumno = this.alumnosAsignatura.find(a => a.id === alumnoId);
        if (alumno) {
          alumno.status = 1; // Cambiamos el estado a "Presente"
        }
      },
      (error: any) => {
        console.error('Error al actualizar asistencia:', error);
      }
    );
  }
}
