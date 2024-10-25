import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-reiniciar-contrasena',
  templateUrl: './reiniciar-contrasena.page.html',
  styleUrls: ['./reiniciar-contrasena.page.scss'],
})
export class ReiniciarContrasenaPage implements OnInit {

  constructor(private router: Router) { } // Inyecta Router

  ngOnInit() {
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    // Aquí puedes agregar la lógica para manejar el envío de correo
    console.log('Correo enviado para reiniciar la contraseña'); // Ejemplo de mensaje
  }

  // Método para redirigir al inicio de sesión
  goToLogin() {
    this.router.navigate(['/login']); // Asegúrate de que la ruta sea correcta
  }
}
