import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthserviceService } from '../service/authservice.service'; //importacion clase autenticacion
import { Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthserviceService);
  const router = inject(Router);

  if(authservice.isLoggedIn()){
    return true;
  }else{
    return router.createUrlTree(['/login']);
  }
};
