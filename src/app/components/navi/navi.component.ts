import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit  {


  isLoggedIn:boolean;

  constructor(private authService:AuthService, private router:Router) {}





  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: response=>{
        this.authService.loggedin()
      },
      error: errorResponse=>{
        this.authService.logout()
      }
    })
    this.isLoggedIn = this.authService.isLoggedin()
    this.authService.isLoggedInChanged.subscribe({
      next: response=>{
        this.isLoggedIn = response;
      }
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/"])
  } 
 
}
