import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsumoapiService {
  // Ajuste de httpOptions sin la cabecera Access-Control-Allow-Origin
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
  apiURL = 'http://127.0.0.1:5000';  

  constructor(private httpClient: HttpClient) { }

  // Método para login
  login(user: string, password: string): Observable<any> {
    const loginData = { user, password };
    return this.httpClient.post(`${this.apiURL}/login`, loginData, this.httpOptions).pipe(
      retry(1)
    );
  }

  // Método para obtener los cursos de un profesor
  obtenerCursosProfesor(profesorId: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/profesores/${profesorId}/cursos`, this.httpOptions).pipe(
      retry(1)
    );
  }

  // Método para actualizar la asistencia de un alumno
  actualizarAsistencia(profesorId: number, cursoId: number, alumnoId: number): Observable<any> {
    const url = `${this.apiURL}/profesores/${profesorId}/cursos/${cursoId}/alumnos/${alumnoId}/asistencia`;
    return this.httpClient.put(url, {}, this.httpOptions).pipe(
      retry(1)
    );
  }

  obtenerProfesorPorCurso(cursoId: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/cursos/${cursoId}/profesor`, this.httpOptions);
  }
}
