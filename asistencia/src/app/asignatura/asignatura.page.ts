import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.detallesAsignatura = navigation.extras.state['detalles'];
    }
  }

  ngOnInit() {
    if (this.detallesAsignatura) {
      this.alumnosAsignatura = this.detallesAsignatura.alumnos || [];
      this.generateQR(); // Llamamos la función para generar el QR
    } else {
      console.error('No se recibieron detalles de la asignatura');
    }
  }

  // Función para generar el código QR
  generateQR() {
    const asignatura = this.detallesAsignatura.nombre;
    const seccion = this.detallesAsignatura.seccion;
    const fecha = format(new Date(), 'yyyy-MM-dd');

    this.qrAsignaturaData = JSON.stringify({
      asignatura: asignatura,
      seccion: seccion,
      fecha: fecha,
    });

    console.log('QR Code data:', this.qrAsignaturaData);
  }
}
