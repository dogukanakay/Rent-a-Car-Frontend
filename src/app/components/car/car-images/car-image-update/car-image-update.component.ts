import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Image } from 'src/app/models/image';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image-update',
  templateUrl: './car-image-update.component.html',
  styleUrls: ['./car-image-update.component.css']
})
export class CarImageUpdateComponent implements OnInit {

  images:Image[];
  imagePathPrefix :string = "https://localhost:44338/uploads/images/";
  constructor(
    private carService:CarService,
    private carImageService:CarImageService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe({
      next: params=>{
        if(params["carId"]){
          this.getCarImages(params["carId"])
        }
      }
    })

  }


  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe({
      next: response=>{
        
        if(response.data[0].imagePath == "default.jpg"){
          this.toastrService.info("Bu araca ait güncellenebilecek bir resim bulunmamaktadır. Resim Ekleme sayfasına yönlendiriliyorsunuz","Güncellenemez")
          this.router.navigate(["car/add/image/"+carId])
        }else{
          this.images = response.data
        }
      },error: responseError=>{
        this.toastrService.error("Hata resim bulunamadı","Resim Yok")
      }
    })
  }

}
