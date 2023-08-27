import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car, CarDetailFilter } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { Fuel } from 'src/app/models/fuel';
import { Gear } from 'src/app/models/gear';
import { Image } from 'src/app/models/image';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { FuelService } from 'src/app/services/fuel.service';
import { GearService } from 'src/app/services/gear.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[];
  colors: Color[];
  brands: Brand[];
  gears: Gear[];
  fuels: Fuel[];
  currentCar: Car;
  dataLoaded = false;
  filterText = '';
  carDetailFilter: CarDetailFilter = this.carService.getCarDetailFilter();
  images: Image[];
  imagePathPrefix: string = 'https://localhost:44338/uploads/images/';

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private gearService: GearService,
    private fuelService: FuelService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.getFuels();
    this.getGears();

    this.getCars();
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCars() {
    this.carService.getCars(this.carDetailFilter).subscribe({
      next: (response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      },
      error: (responseError) => {
        console.log(responseError);
        this.toastrService.error(responseError.error.Message, 'HATA');
      },
    });
  }

  getColors() {
    this.colorService.getColors().subscribe({
      next: (response) => {
        this.colors = response.data;
      },
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe({
      next: response=>{
        this.brands = response.data;
      }
    });
  }

  getGears() {
    this.gearService.getGearTypes().subscribe({
      next: response=> {
        this.gears = response.data;
      },
    });
  }

  getFuels(){
    this.fuelService.getFuelTypes().subscribe({
      next: response=>{
        this.fuels = response.data;
      }
    })
  }
}
