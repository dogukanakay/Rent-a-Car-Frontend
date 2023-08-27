import { Component, OnInit } from '@angular/core';
import { CarDetailFilter } from 'src/app/models/car';
import { RentalLocation } from 'src/app/models/rentalLocation';
import { CarService } from 'src/app/services/car.service';
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit  {

  locations : RentalLocation[];
  carDetailFilter = new CarDetailFilter();


  constructor(private carService:CarService, private locationService:LocationService) {}

  ngOnInit(): void {
    this.getLocations();
  }

  
  setCarDetailFilter(){
    this.carService.setCarDetailFilter(this.carDetailFilter);
  }

  getLocations(){
    this.locationService.getRentalLocations().subscribe({
      next: response=>{
        this.locations = response.data
      }
    })
  }
}
