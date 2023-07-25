
import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Image } from 'src/app/models/image';
import { Rental } from 'src/app/models/rental';
import { RentalPost } from 'src/app/models/rentalPost';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  car:Car;
  rentCarId:number;
  rentDate :Date;
  returnDate : Date;
  rentTime:Time;
  returnTime:Time;
  rentalPost: RentalPost = {
    carId: 0,
    customerId: 0,
    rentDate: new Date(),
    returnDate: new Date()
  };
  
 



  //Rental:RentalPost={carId:this.car.carId, customerId:1, rentDate:this.rentDate, returnDate:this.returnDate};
  dataLoaded = false;
  rentStatus :string;
  images:Image[];
  imagePathPrefix :string = "https://localhost:44338/uploads/images/";

  
  constructor(private carService : CarService, private rentalService: RentalService,private activatedRoute:ActivatedRoute, private toastrService: ToastrService, private router:Router) {}

  ngOnInit():void{
    this.activatedRoute.params.subscribe(params=>{
      this.getCarByCarId(params["carId"]);
      this.getImagesByCarId(params["carId"]);
    })
    
  }

  getCarByCarId(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response =>{
      this.car = response.data;
      this.dataLoaded = true;
    })
  }
  getImagesByCarId(carId:number){
    this.carService.getImagesByCarId(carId).subscribe(response =>{
      this.images = response.data;
    })
  }

  addRental(rentalPost:RentalPost){
    
    this.rentalService.addRental(rentalPost).subscribe(response =>{
     console.warn(response.success,response.message);
    })
  }
  
  isRentable(carId:number, rentDate:Date, returnDate:Date){


    this.rentalService.isRentable(carId,rentDate,returnDate).subscribe(response=>{
      console.log(response)
      console.log(carId,rentDate,returnDate)
      if(response){
        this.rentalPost.carId=carId;
        this.rentalPost.customerId=1;
        this.rentalPost.rentDate=rentDate;
        this.rentalPost.returnDate=returnDate
        this.rentalService.saveRentalPostInformation(this.rentalPost)
        this.toastrService.success("Araç Kiralanabilir. Ödeme Sayfasına Yönlendiriliyorsunuz.","Araç Durumu")
        this.router.navigate(['/car', carId, 'payment']);
      }else{
        this.toastrService.error("Bu tarihlerde bu araç kiralanamaz", "Araç Durumu")
      }

      
    })
  }

 
}
