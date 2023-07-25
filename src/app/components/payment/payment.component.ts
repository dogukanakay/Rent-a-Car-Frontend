import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalPost } from 'src/app/models/rentalPost';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  
  toplamTutar:number
  carId:number
  rentalPost: RentalPost = {
    carId: 0,
    customerId: 0,
    rentDate: new Date(),
    returnDate: new Date()
  };
  
  constructor(private rentalService : RentalService, private activatedRoute:ActivatedRoute, private carService:CarService, private toastrService:ToastrService) {
    
    

  }
  
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.carId = params["carId"];
    })

    this.rentalPost = this.rentalService.getRentalPostInformation();
    this.calculateTotalAmount(this.carId);
    
    
  }


  createRental(){
    this.rentalService.addRental(this.rentalPost).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message)
      }else{
        this.toastrService.error(response.message)
      }
      
    })
  }

  calculateTotalAmount(carId:number) {
    const start = new Date(this.rentalPost.rentDate);
    const end = new Date(this.rentalPost.returnDate);
    const differenceInMilliseconds = end.getTime() - start.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    this.carService.getCarByCarId(carId).subscribe(response=>{
      this.toplamTutar = response.data.dailyPrice * differenceInDays
      
    })
    
  }

}
