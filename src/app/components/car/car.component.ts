import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[];
  colors: Color[];
  brands: Brand[];
  selectedColorId:number;
  selectedBrandId:number;
  currentCar:Car;
  dataLoaded = false;
  filterText ="";

  constructor(private carService: CarService, private colorService: ColorService, private brandService: BrandService,private activatedRoute:ActivatedRoute) {}
  ngOnInit(): void {

    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandIdAndColorId(params["brandId"], params["colorId"])
      }else if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"]);
      }else{
        this.getCars();
      }
    })
    
  }

  setCurrentCar(car:Car){
    this.currentCar = car;
  }
  
  getCars(){
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
  })
  }
  
  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getCarsByColorId(colorId:number){
    this.carService.getCarsByColorId(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByBrandIdAndColorId(brandId:number,colorId:number){
    this.carService.getCarsByBrandIdAndColorId(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
}
