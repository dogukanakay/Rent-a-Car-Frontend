import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailFilter } from 'src/app/models/car';
import { RentalLocation } from 'src/app/models/rentalLocation';
import { CarService } from 'src/app/services/car.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-find-car',
  templateUrl: './find-car.component.html',
  styleUrls: ['./find-car.component.css']
})
export class FindCarComponent implements OnInit {
  locations : RentalLocation[];
  carDetailFilter = new CarDetailFilter();


  constructor(private carService:CarService, private locationService:LocationService, private router:Router, private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getLocations();
  }

  
  setCarDetailFilter(){
    if(this.carDetailFilter.rentDate==null || this.carDetailFilter.returnDate == null ){
      this.toastrService.error("Lütfen Tarih Seçimi Yapınız.")
    }else if(this.carDetailFilter.rentDate>=this.carDetailFilter.returnDate){
      this.toastrService.error("Hatalı Tarih Seçimi Yaptınız")
    }else{
      this.carService.setCarDetailFilter(this.carDetailFilter);
      this.router.navigate(["cars"])
    }
    
  }

  getLocations(){
    this.locationService.getRentalLocations().subscribe({
      next: response=>{
        this.locations = response.data
       
      }
    })
  }
}
