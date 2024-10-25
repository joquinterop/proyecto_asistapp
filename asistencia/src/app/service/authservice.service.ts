import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private authenticated = false;

  constructor() {}
  
  isLoggedIn(){
    return this.authenticated; //Estado que retornara la clase;
  }

  login(){
    this.authenticated = true; //   Cambia el estado si el login es exitoso
  }

  logout(){
    this.authenticated = false; //Cambia el estado para salir de la app
  }
}
