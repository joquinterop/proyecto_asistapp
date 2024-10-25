// Importaciones necesarias desde Angular y Capacitor
import { Component, OnInit } from '@angular/core'; // Para definir un componente y usar el ciclo de vida de Angular
import { Router } from '@angular/router'; // Para navegar entre rutas
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para crear y validar formularios
import { AuthserviceService } from '../service/authservice.service'; // Servicio de autenticación
import { ConsumoapiService } from '../service/consumoapi.service'; // Servicio para consumir APIs
import { AlertController } from '@ionic/angular'; // Para mostrar alertas
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Para usar la cámara, aunque no se necesita en tu caso

// Decorador que define el componente
@Component({
  selector: 'app-login', // Selector del componente
  templateUrl: './login.page.html', // Ruta del archivo HTML
  styleUrls: ['./login.page.scss'], // Ruta del archivo de estilos
})
export class LoginPage implements OnInit {
  usuario: FormGroup;  // Declaramos un grupo de formulario para manejar los datos del usuario

  // Constructor que inyecta los servicios necesarios
  constructor(
    private fb: FormBuilder, // FormBuilder para construir formularios
    private router: Router, // Router para la navegación
    private alertController: AlertController, // Controlador de alertas
    private authService: AuthserviceService, // Servicio de autenticación
    private apiService: ConsumoapiService // Servicio de consumo de APIs
  ) {
    // Inicializamos el formulario con campos vacíos y validaciones
    this.usuario = this.fb.group({
      user: ['', [Validators.required]], // Campo de usuario requerido
      pass: ['', [Validators.required]], // Campo de contraseña requerido
    });
  }

  // ngOnInit se ejecuta al inicializar el componente
  ngOnInit() {
    this.limpiarFormulario(); // Limpia el formulario al cargar la página
  }

  // ionViewWillEnter se ejecuta cada vez que la vista está a punto de aparecer
  ionViewWillEnter() {
    this.limpiarFormulario(); // Limpia el formulario cada vez que se entra a la página
  }

  // Método para manejar el inicio de sesión
  async login() {
    if (this.usuario.valid) { // Verifica si el formulario es válido
      const user = this.usuario.value.user; // Obtiene el valor del campo usuario
      const pass = this.usuario.value.pass; // Obtiene el valor del campo contraseña
  
      // Llama a la API para realizar el login
      this.apiService.login(user, pass).subscribe(
        async (response: any) => {
          console.log('Respuesta de la API:', response);
          if (response.tipoPerfil === 1) {
            // Si el perfil es de profesor
            this.authService.login(); // Inicia sesión
            this.router.navigate(['/professor-profile'], { // Navega a la página del perfil del profesor
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
            this.authService.login(); // Inicia sesión
            // Aquí se podría navegar a la página del perfil del estudiante sin capturar una imagen
            this.router.navigate(['/student-profile'], {
              state: { 
                nombre: response.nombre, 
                id: response.id,
                correo: response.correo,
                fotoPerfil: response.fotoPerfil
              }
            });
          } else {
            console.log('Perfil no válido'); // Manejo de perfil no válido
          }
        },
        async (error: any) => {
          console.error('Error en el login:', error); // Manejo de errores en la respuesta de la API
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Credenciales incorrectas, por favor inténtalo de nuevo.', // Mensaje de error
            buttons: ['OK'] // Botón para cerrar la alerta
          });
          await alert.present(); // Presenta la alerta
        }
      );
    }
  }
  
  // Nueva función para limpiar el formulario y el almacenamiento local
  limpiarFormulario() {
    this.usuario.reset(); // Resetea el formulario
    localStorage.clear(); // Limpia el almacenamiento local
    sessionStorage.clear(); // Limpia el almacenamiento de sesión
  }

  // Método para navegar a la página de reinicio de contraseña
  goToResetPassword() {
    this.router.navigate(['/reiniciar-contrasena']); // Navega a la página de reinicio de contraseña
  }
}
