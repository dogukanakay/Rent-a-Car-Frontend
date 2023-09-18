import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  profileUpdateForm: FormGroup;
  user: User;
  dataloaded = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.createCompanyProfileUpdateForm();
  }

  getUser() {
    this.userService.getUserDetail().subscribe({
      next: (response) => {
        this.user = response.data;
        this.profileUpdateForm.patchValue({
          id: this.user.id,
          customerId: this.user.customerId,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          companyName: this.user.companyName,
        });
        this.dataloaded = true;
      },
      error: (responseError) => {
        this.toastrService.error('Önce Giriş Yapmalısınız');
        this.router.navigate(['login']);
      },
    });
  }

  createCompanyProfileUpdateForm() {
    this.profileUpdateForm = this.formBuilder.group({
      id: ['',Validators.required],
      customerId: ['',Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }
  createProfileUpdateForm() {
    this.profileUpdateForm = this.formBuilder.group({
      id: ['',Validators.required],
      customerId: ['',Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  userUpdate() {
    
  }
}
