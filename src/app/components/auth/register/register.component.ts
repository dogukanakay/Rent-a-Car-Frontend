import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  isCompany: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createUserRegisterForm();
  }

  createUserRegisterForm() {
    this.userRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: [''],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.userRegisterForm.valid) {
      let registerModel = Object.assign({}, this.userRegisterForm.value);

      this.authService.register(registerModel).subscribe({
        next: (response) => {
          this.toastrService.success('Kayıt Başarılı', 'Başarılı');
          this.router.navigate(["login"])
        },
        error: (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        },
      });
    } else {
      this.toastrService.error('Boş alan bırakmayınız.', 'Hata');
    }
  }
}
