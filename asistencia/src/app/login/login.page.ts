import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../service/authservice.service';
import { ConsumoapiService } from '../service/consumoapi.service'; 
import { AlertController } from '@ionic/angular'; 
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; 


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


  ngOnInit() {
    this.limpiarFormulario(); 
  }

  ionViewWillEnter() {
    this.limpiarFormulario();
  }

  // Método para manejar el inicio de sesión
  async login() {
    if (this.usuario.valid) { 
      const user = this.usuario.value.user; 
      const pass = this.usuario.value.pass;
  
      // Llama a la API para realizar el login
      this.apiService.login(user, pass).subscribe(
        async (response: any) => {
          console.log('Respuesta de la API:', response);
          if (response.tipoPerfil === 1) {
            // Si el perfil es de profesor
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
            // Si el perfil es de estudiante
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
  
 
  limpiarFormulario() {
    this.usuario.reset();
    localStorage.clear();
    sessionStorage.clear(); 
  }

  // Método para navegar a la página de reinicio de contraseña
  goToResetPassword() {
    this.router.navigate(['/reiniciar-contrasena']); 
  }
}
