import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserDetails } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService:UserService, private toastrService:ToastrService) {}
  user:UserDetails;
  dataLoaded:boolean=false;
  ngOnInit(): void {
    this.userService.getUserDetail().subscribe({
      next: response=>{
        this.user = response.data
        this.dataLoaded = true;
      },
      error: responseError=>{
        this.toastrService.error(responseError.error ,"Hata")
        this.dataLoaded=true;
      }
    })
  }


  updateProfile(){

  }

}
