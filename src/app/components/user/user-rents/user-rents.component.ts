import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental, RentalDetailFilter } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-rents',
  templateUrl: './user-rents.component.html',
  styleUrls: ['./user-rents.component.css'],
})
export class UserRentsComponent implements OnInit {
  rentalDetailFilter: RentalDetailFilter =
    this.rentalService.getRentalDetailFilter();
  dataLoaded = false;
  rentals: Rental[];

  constructor(
    private userService: UserService,
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRentalDetailsByCustomerId();
  }

 getRentalDetailsByCustomerId() {
    this.userService.getUserDetail().subscribe({
     next: (response) => {
       this.rentalDetailFilter.customerId = response.data.customerId;
       this.rentalService.getRentals(this.rentalDetailFilter).subscribe({
        next: (response) => {
          this.rentals = response.data;
          if (response.data.length < 1) {
            this.toastrService.info(
              'Herhangi bir kiralamanız bulunmamaktadır',
              'Bilgi'
            );
          } else {
            this.dataLoaded = true;
          }
        },
        error: (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        },
      });
     },
     error: (responseError) => {
       this.toastrService.error('Kullanıcı bulunamadı', 'HATA');
     },
   });
    
  }
}
