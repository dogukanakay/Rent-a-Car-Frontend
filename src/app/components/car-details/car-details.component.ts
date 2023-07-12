import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Image } from 'src/app/models/image';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  car:Car;
  dataLoaded = false;
  images:Image[];
  imagePathPrefix :string = "https://localhost:44338/uploads/images/";

  
  constructor(private carService : CarService, private activatedRoute:ActivatedRoute ) {}

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
}
