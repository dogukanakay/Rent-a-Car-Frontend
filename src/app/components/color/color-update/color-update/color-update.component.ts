import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  
  colorUpdateForm:FormGroup
  colorId:number
  

  constructor(private colorService:ColorService, private toastrService:ToastrService, private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) {}
  
  
  
  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe((params)=>{
      this.colorId = params["colorId"]
      this.colorUpdateForm.patchValue({
        colorId : params["colorId"],
        colorName : params["colorName"]
      })
    })
  }

  

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [{value :"", disabled:true}, Validators.required],
      colorName:["", Validators.required]
    })
  }
  


  colorUpdate(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value )
      colorModel.colorId = this.colorId
      this.colorService.colorUpdate(colorModel).subscribe({
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
      this.toastrService.error("Renk güncellenemedi.","HATA")
    }
  }
}





