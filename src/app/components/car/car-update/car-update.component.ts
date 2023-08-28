import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarPost } from 'src/app/models/car';
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
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  car: CarPost;
  carId:number;
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
    private activatedRoute: ActivatedRoute,
    private carClassService: CarClassService,
    private fuelService: FuelService,
    private modelService: ModelService,
    private gearService: GearService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarByCarId(params['carId']);
      this.carId = params['carId']
    });
    this.getColors();
    this.getBrands();
    this.getCarClasses();
    this.getFuels();
    this.getLocations();
    this.getModels();
    this.getGears();
    this.createCarUpdateForm();
   
  }

  getCarByCarId(carId: number) {
    this.carService.getCarByCarId(carId).subscribe({
      next: (response) => {
        this.car = response.data;
        this.carUpdateForm.patchValue({
          carId: this.car.carId,
          classId: this.car.classId,
          locationId: this.car.locationId,
          brandId: this.car.brandId,
          modelId: this.car.modelId,
          gearId: this.car.gearId,
          fuelId: this.car.fuelId,
          colorId: this.car.colorId,
          modelYear: this.car.modelYear,
          dailyPrice: this.car.dailyPrice,
          findexScore: this.car.findexScore,
          description: this.car.description,
        });
      },
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [{ value: '', disabled: true }, Validators.required],
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

  carUpdate() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.carId = this.car.carId;
      this.carService.carUpdate(carModel).subscribe({
        next: (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        error: (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        },
      });
    } else {
      this.toastrService.error('Araba güncellenemedi.', 'HATA');
    }
  }
}
