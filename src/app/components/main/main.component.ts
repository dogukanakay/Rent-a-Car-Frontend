import { Component, OnInit } from '@angular/core';
import { CarDetailFilter } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit  {

  rentDate :Date;
  returnDate : Date;
  carDetailFilter = new CarDetailFilter();

  constructor(private carService:CarService) {}

  ngOnInit(): void {
    
  }


  setCarDetailFilter(){
    this.carDetailFilter.rentDate = this.rentDate;
    this.carDetailFilter.returnDate = this.returnDate;
    this.carService.setCarDetailFilter(this.carDetailFilter);
  }
}
