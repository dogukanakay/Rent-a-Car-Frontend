import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarPost } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  car: CarPost;
  colors: Color[];
  brands: Brand[];

  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCarByCarId(params['carId']);
    });
   
  
  }

  getCarByCarId(carId: number) {
    this.carService.getCarByCarId(carId).subscribe({
      next: (response) => {
        this.car = response.data;
        this.carUpdateForm.patchValue({
          id: carId,
          brandId: this.car.brandId,
          colorId: this.car.colorId,
          modelYear: this.car.modelYear,
          dailyPrice: this.car.dailyPrice,
          description: this.car.description,
        });
      },
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
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

  carUpdate() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.id=this.car.carId
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
