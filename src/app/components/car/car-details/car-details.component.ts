import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Car, CarDetailFilter } from 'src/app/models/car';
import { Image } from 'src/app/models/image';
import { Rental } from 'src/app/models/rental';
import { RentalPost } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car;
  rentCarId: number;
  rentDate: Date;
  returnDate: Date;
  rentTime: Time;
  returnTime: Time;
  rentalPost: RentalPost = new RentalPost();
  carDetails: CarDetailFilter = this.carService.getCarDetailFilter();

  dataLoaded = false;
  imageLength = true;
  rentStatus: string;
  images: Image[];
  defaultImage: Image;
  imagePathPrefix: string = 'https://localhost:44338/uploads/images/';

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailsByCarId(params['carId']);
      this.calculateTotalAmount(params['carId']);
      this.getImagesByCarId(params['carId']);
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data;
      this.dataLoaded = true;
    });
  }
  getImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      if (response.data.length < 2) {
        this.imageLength = false;
        this.defaultImage = response.data[0];
      } else {
        this.images = response.data;
      }
    });
  }

  calculateTotalAmount(carId: number) {
    const start = new Date(this.carDetails.rentDate);
    const end = new Date(this.carDetails.returnDate);
    const differenceInMilliseconds = end.getTime() - start.getTime();
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.rentalPost.totalPrice = response.data.dailyPrice * differenceInDays;
    });
  }

  saveRentalPostInformation() {
    this.rentalPost.carId = this.car.carId;
    this.userService.getUserDetail().subscribe({
      next: (response) => {
        this.rentalPost.customerId = response.data.customerId;
        if (response.data.findexScore < this.car.findexScore) {
          this.toastrService.error(
            'Bu Aracı Kiralamaya Uygun Değilsiniz.(Findex Puanınız Araç İçin Gerekli Findex Puanından Düşük)',
            'Kiralama Yapılamaz'
          );
          return;
        }
      },
    });
    this.rentalPost.dropOffLocationId = this.car.locationId;
    this.rentalPost.pickUpLocationId = this.car.locationId;
    this.rentalPost.rentDate = this.carDetails.rentDate;
    this.rentalPost.returnDate = this.carDetails.returnDate;

    console.log(this.rentalPost);
    this.rentalService.isRentable(this.rentalPost).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/cars', this.car.carId, 'payment']);
          this.rentalService.saveRentalPostInformation(this.rentalPost);
          this.toastrService.success(
            'Araç Kiralanabilir. Ödeme Sayfasına Yönlendiriliyorsunuz.',
            'Araç Durumu'
          );
        } else {
          this.toastrService.error(
            'Bu tarihlerde bu araç kiralanamaz',
            'Araç Durumu'
          );
        }
      },
      error: (responseError) => {
        this.toastrService.error(
          responseError.error.message,
          'Doğrulama hatasi'
        );
      },
    });
  }

  /*/ REFACTOR EDİLECEK KISIM 
  rent(){
    this.rentalPost.dropOffLocationId = this.car.locationId
    this.rentalPost.pickUpLocationId = this.car.locationId
    this.rentalPost.rentDate = this.carDetails.rentDate
    this.rentalPost.returnDate = this.carDetails.returnDate
    this.rentalPost.carId = this.car.carId;

    this.getCustomerId()

    console.log(this.rentalPost);


    const isRentable = this.isRentable()
    console.log(isRentable)

    if(){
      this.router.navigate(['/cars', this.car.carId, 'payment']);
      this.saveRentalPostInformation()
      this.toastrService.success(
        'Araç Kiralanabilir. Ödeme Sayfasına Yönlendiriliyorsunuz.',
        'Araç Durumu'
      );
    } else {
      this.toastrService.error(
        'Bu tarihlerde bu araç kiralanamaz',
        'Araç Durumu'
      );
    }
  }
  saveRentalPostInformation() {
    
    this.rentalService.saveRentalPostInformation(this.rentalPost);
   
  }
  
  

  getCustomerId(){
    
    this.userService.getUserDetail().subscribe({
      next: response=>{
        this.rentalPost.customerId = response.data.customerId;
      }
    })
  }

  async isRentable(){
    
    const isRentable = (await firstValueFrom(this.rentalService.isRentable(this.rentalPost))).success
    
  }
  /*/
}
