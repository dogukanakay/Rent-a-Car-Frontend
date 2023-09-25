import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent implements OnInit {

  updatePassword:FormGroup;


  constructor(private authService:AuthService, private toastrService:ToastrService, private formBuilder:FormBuilder, private router:Router) {}
  ngOnInit(): void {
    this.createUpdatePasswordForm();
  }


  createUpdatePasswordForm() {
    this.updatePassword = this.formBuilder.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      newPasswordAgain: ["", Validators.required]
    },{ validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword').value;
    const newPasswordAgain = control.get('newPasswordAgain').value;

    if (newPassword === newPasswordAgain) {
      return null; 
    } else {
      return { 'passwordMismatch': true }; 
    }
  }

  update(){
    if(this.updatePassword.valid){
      let updatePasswordModel = Object.assign({}, this.updatePassword.value)
      this.authService.updatePassword(updatePasswordModel).subscribe({
        next: response=>{
          this.toastrService.success(response.message);
          this.router.navigate(["profile"])
        },
        error: responseError=>{
          this.toastrService.error(responseError.error.message)
        }
      })
    }else{
      this.toastrService.error("Girilen iki yeni şifre aynı olmalı")
    }
  }
}
