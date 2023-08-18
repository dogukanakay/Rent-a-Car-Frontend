import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car, CarDetailFilter } from 'src/app/models/car';
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
  selectedColorId: number;
  selectedBrandId: number;
  currentCar: Car;
  dataLoaded = false;
  filterText = '';
  carDetailFilter: CarDetailFilter = {
    locationId: null,
    brandId: null,
    modelId: null,
    gearId: null,
    fuelId: null,
    colorId: null,
    rentDate: null,
    returnDate: null,
  };

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.carDetailFilter.brandId = params['brandId'];
      } else if (params['colorId']) {
        this.carDetailFilter.colorId = params['colorId'];
      }

      this.getCars();
    });
    console.log(this.carDetailFilter);
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCars() {
    this.carService.getCars(this.carDetailFilter).subscribe((response) => {
      console.log(response);
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
