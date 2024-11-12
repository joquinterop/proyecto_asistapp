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
    this.cargarDatosAsignatura();
    this.generateQR();

    // Refresca la lista de alumnos cada 5 segundos (ajusta el tiempo si es necesario)
    setInterval(() => {
      this.cargarDatosAsignatura();
    }, 2000);
  }

  // Función para cargar los datos de la asignatura
  cargarDatosAsignatura() {
    if (this.detallesAsignatura) {
      // Cargar la lista de alumnos de la asignatura desde la API
      this.consumoAPI.obtenerAlumnos(this.detallesAsignatura.id).subscribe(
        (response: any) => {
          this.alumnosAsignatura = response.alumnos || [];
        },
        (error: any) => {
          console.error('Error al cargar alumnos:', error);
        }
      );
    } else {
      console.error('No se recibieron detalles de la asignatura');
    }
  }

  // Función para generar el código QR
  generateQR() {
    const asignatura = this.detallesAsignatura.nombre;
    const seccion = this.detallesAsignatura.seccion;
    const fecha = format(new Date(), 'yyyy-MM-dd');
    const profesorId = history.state.id;  
    const cursoId = this.detallesAsignatura.id; 
  
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
        // Recargar los datos de los alumnos después de la actualización
        this.cargarDatosAsignatura();
      },
      (error: any) => {
        console.error('Error al actualizar asistencia:', error);
      }
    );
  }
}
