import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

 
  carAddForm : FormGroup;
  colors: Color[];
  brands: Brand[];

  constructor(private carService:CarService, private formBuilder:FormBuilder, private toastrService:ToastrService
              ,private colorService:ColorService, private brandService:BrandService) {
 
    
  }


  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["", Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  carAdd(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value)
      this.carService.carAdd(carModel).subscribe({
        next: response=>{
          this.toastrService.success(response.message,"Başarılı")
        },
        error: responseError=>{
          if(responseError.error.Errors.length>0){
            for(let i=0; i<responseError.error.Errors.length;i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama Hatası")
            }
          }
        }
      })
    }else{
      this.toastrService.error("Araba Eklenemedi","HATA")
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
}
