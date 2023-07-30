import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

 
  carAddForm : FormGroup;

  constructor(private carService:CarService, private formBuilder:FormBuilder, private toastrService:ToastrService) {
 
    
  }


  ngOnInit(): void {
    
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
}
