import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginForm:FormGroup

  constructor(private authService:AuthService, private formBuilder:FormBuilder, private toastrService:ToastrService) {
    
  }
  
  ngOnInit(): void {
    this.createUserLoginForm();
  }

  createUserLoginForm(){
    this.userLoginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  login(){
    if(this.userLoginForm.valid){
      let loginModel = Object.assign({}, this.userLoginForm.value)
      this.authService.login(loginModel).subscribe({
        next: response=>{
          this.toastrService.success("Giriş Başarılı","Başarılı")
          console.log(response)
        },
        error: responseError=>{
          console.log(responseError)
          if(responseError.error){
            
            this.toastrService.error(responseError.error.message, "Doğrulama Hatası")
            
          }
        }
      })

    }else{
      this.toastrService.error("Giriş Yapılamadı. Lütfen boş alan bırakmayınız.","HATA")
    }
  }
}
