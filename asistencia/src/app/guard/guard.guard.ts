import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthserviceService } from '../service/authservice.service';
import { Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const role = authService.getRole(); // Obtener el rol
    const targetRoute = state.url;

    // Permitir acceso según el rol y la ruta
    if ((role === 1 && (targetRoute.includes('/professor-profile') || targetRoute.includes('/asignatura'))) || 
        (role === 2 && targetRoute.includes('/student-profile'))) {
      return true;
    } else {
      return router.createUrlTree(['/login']); // Redirigir a login si la ruta no coincide
    }
  } else {
    return router.createUrlTree(['/login']);
  }
};
