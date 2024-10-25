import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../service/authservice.service';
import { ConsumoapiService } from '../service/consumoapi.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: FormGroup;  

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private alertController: AlertController, 
    private authService: AuthserviceService,
    private apiService: ConsumoapiService  
  ) {
    // Inicializamos el formulario con campos vacíos y validaciones
    this.usuario = this.fb.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  // Se añade ngOnInit para limpiar el formulario al cargar la página
  ngOnInit() {
    this.limpiarFormulario();
  }

  ionViewWillEnter() {
    this.limpiarFormulario(); //Para limpiar cada vez que entramos a la pagina
  }

  async login() {
    if (this.usuario.valid) {
      const user = this.usuario.value.user;
      const pass = this.usuario.value.pass;
  
      // Llamada a la API para el login
      this.apiService.login(user, pass).subscribe(
        (response: any) => {
          console.log('Respuesta de la API:', response);
          if (response.tipoPerfil === 1) {
            // Perfil Profesor
            this.authService.login();
            this.router.navigate(['/professor-profile'], {
              state: { 
                nombre: response.nombre, 
                id: response.id,
                correo: response.correo,
                fotoPerfil: response.fotoPerfil
              }
            });
          } else if (response.tipoPerfil === 2) {
            // Perfil Estudiante
            console.log('Navegando al perfil de estudiante');
            this.authService.login();
            this.router.navigate(['/student-profile'], {
              state: { 
                nombre: response.nombre, 
                id: response.id,
                correo: response.correo,
                fotoPerfil: response.fotoPerfil
              }
            });
          } else {
            console.log('Perfil no válido');
          }
        },
        async (error: any) => {
          console.error('Error en el login:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Credenciales incorrectas, por favor inténtalo de nuevo.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
      
      
    }
  }
  
  // Nueva función para limpiar el formulario y el almacenamiento local
  limpiarFormulario() {
    this.usuario.reset(); 
    localStorage.clear(); 
    sessionStorage.clear(); 
  }

  goToResetPassword() {
    this.router.navigate(['/reiniciar-contrasena']);
  }
}
