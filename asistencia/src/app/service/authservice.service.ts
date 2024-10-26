import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private authenticated = false;
  private role: number | null = null; // Guardará el rol del usuario (1 = profesor, 2 = alumno)

  constructor() {}
  
  isLoggedIn() {
    return this.authenticated; 
  }

  getRole() {
    return this.role; // Devuelve el rol actual
  }

  login(role: number) {
    this.authenticated = true;
    this.role = role; // Establece el rol del usuario cuando inicia sesión
  }

  logout() {
    this.authenticated = false;
    this.role = null; // Resetea el rol al cerrar sesión
  }
}
