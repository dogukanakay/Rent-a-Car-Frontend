import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  
  brandUpdateForm:FormGroup
  brandId:number
  

  constructor(private brandService:BrandService, private toastrService:ToastrService, private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) {}
  
  
  
  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe((params)=>{
      this.brandId = params["brandId"]
      this.brandUpdateForm.patchValue({
        id : params["brandId"],
        name : params["brandName"]
      })
    })
  }

  

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id: [{value :"", disabled:true}, Validators.required],
      name:["", Validators.required]
    })
  }
  


  brandUpdate(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({},this.brandUpdateForm.value )
      brandModel.id = this.brandId
      this.brandService.brandUpdate(brandModel).subscribe({
        next: response=>{
          this.toastrService.success(response.message,"Güncelleme Başarılı")
        },
        error: responseError=>{
          if(responseError.error.Errors.length>0){
            for(let i=0; i< responseError.error.Errors.length; i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
            }
          }
        }
      })
    }else{
      this.toastrService.error("Marka güncellenemedi.","HATA")
    }
  }
}


