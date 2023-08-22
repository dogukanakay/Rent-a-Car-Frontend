import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn : 'root'
})

class IsLoginGuard {

  constructor(private authService:AuthService, private router:Router, private toastrService:ToastrService) {}

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){

    return this.authService.isAuthenticated().subscribe({
      next: response => {
        return true
        
      },
      error: errorResponse => {
        this.toastrService.info("Önce Giriş Yap");
        this.router.navigate(['login']);
        return false
      }
      
    })
    
  }
}

export const loginGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {

  
  if(inject(IsLoginGuard).canActivate(route,state)){
    return true;
  }else{
    return false;
  }
  
};
