import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarClass } from 'src/app/models/carClass';
import { Color } from 'src/app/models/color';
import { Fuel } from 'src/app/models/fuel';
import { Gear } from 'src/app/models/gear';
import { Model } from 'src/app/models/model';
import { RentalLocation } from 'src/app/models/rentalLocation';
import { BrandService } from 'src/app/services/brand.service';
import { CarClassService } from 'src/app/services/car-class.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { FuelService } from 'src/app/services/fuel.service';
import { GearService } from 'src/app/services/gear.service';
import { LocationService } from 'src/app/services/location.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  locations: RentalLocation[];
  models: Model[];
  gears: Gear[];
  fuels: Fuel[];
  carClasses: CarClass[];

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService,
    private carClassService: CarClassService,
    private fuelService: FuelService,
    private modelService: ModelService,
    private gearService: GearService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.getCarClasses();
    this.getFuels();
    this.getLocations();
    this.getModels();
    this.getGears();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      classId: ['', Validators.required],
      locationId: ['', Validators.required],
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      gearId: ['', Validators.required],
      colorId: ['', Validators.required],
      fuelId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      findexScore: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  carAdd() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      console.log(carModel);
      this.carService.carAdd(carModel).subscribe({
        next: (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        error: (responseError) => {
          this.toastrService.error(
            responseError.message,
            'Doğrulama Hatası'
          );
        },
      });
    } else {
      this.toastrService.error('Araba Eklenemedi', 'HATA');
    }
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
      next: (response) => {
        this.brands = response.data;
      },
    });
  }

  getModels() {
    this.modelService.getModels().subscribe({
      next: (response) => {
        this.models = response.data;
      },
    });
  }

  getCarClasses() {
    this.carClassService.getCarClasses().subscribe({
      next: (response) => {
        this.carClasses = response.data;
      },
    });
  }

  getLocations() {
    this.locationService.getRentalLocations().subscribe({
      next: (response) => {
        this.locations = response.data;
      },
    });
  }

  getFuels() {
    this.fuelService.getFuelTypes().subscribe({
      next: (response) => {
        this.fuels = response.data;
      },
    });
  }

  getGears() {
    this.gearService.getGearTypes().subscribe({
      next: (response) => {
        this.gears = response.data;
      },
    });
  }
}
