import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn : 'root'
})

class IsLoginGuard {

  constructor(private authService:AuthService, private router:Router, private toastrService:ToastrService) {}
  isAuth:Boolean=true;
  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){

    this.authService.isAuthenticated().subscribe({
      next: response => {
        this.isAuth=true;
        
      },
      error: errorResponse => {
        this.toastrService.info("Önce Giriş Yap");
        this.router.navigate(['login']);
        this.isAuth =false;
      }
      
    })
    console.log(this.isAuth);
    return this.isAuth;
  }
}

export const loginGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {

  
  if(inject(IsLoginGuard).canActivate(route,state)){
    return true;
  }else{
    return false;
  }
  
};
