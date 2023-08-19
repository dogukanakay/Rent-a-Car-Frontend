import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  userRegisterForm:FormGroup

  constructor(private authService:AuthService, private formBuilder:FormBuilder, private toastrService:ToastrService) {}


  ngOnInit(): void {
    this.createUserRegisterForm();
  }







  createUserRegisterForm(){
    this.userRegisterForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["", Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if(this.userRegisterForm.valid){
      let registerModel = Object.assign({},this.userRegisterForm.value)

      this.authService.register(registerModel).subscribe({
        next: response=>{
          this.toastrService.success("Kayıt Başarılı","Başarılı")
        },
        error: responseError=>{
          this.toastrService.error(responseError.error.message,"Hata")
        }
      })
    }else{
      this.toastrService.error("Boş alan bırakmayınız.","Hata")
    }
  }

}
