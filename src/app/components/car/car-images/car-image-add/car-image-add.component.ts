import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit{

  imageAddForm : FormGroup;
  constructor(
    private carService:CarService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  createImageAddForm(){
    this.imageAddForm = this.formBuilder.group({
      carId:["",Validators.required]
    })
  }

  uploadImage(){
    
  }
}
