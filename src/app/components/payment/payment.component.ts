import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentPost } from 'src/app/models/payment';
import { RentalPost } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  toplamTutar: number;
  carId: number;
  rentalPost: RentalPost = this.rentalService.getRentalPostInformation()
  paymentPost: PaymentPost = new PaymentPost();

  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['carId'];
    });

  }

  createRental() {
    this.paymentPost.amountPaid = this.rentalPost.totalPrice
    this.paymentPost.customerId = this.rentalPost.customerId;
    this.rentalService.addRental(this.rentalPost, this.paymentPost).subscribe((response) => {
      if (response.success) {
        this.toastrService.success(response.message);
      } else {
        this.toastrService.error(response.message);
      }
    });
  }

 
}
