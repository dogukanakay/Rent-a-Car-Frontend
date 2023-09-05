import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental, RentalDetailFilter } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { RentalPost } from '../models/rental';
import { EntityResponseModel } from '../models/entityResponseModel';
import { JsonPipe } from '@angular/common';
import { environment } from 'src/environments/environment.development';
import { Payment, PaymentPost } from '../models/payment';
import { RentalPayment } from '../models/rentalPayment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl=environment.apiUrl
  constructor(private httpClient:HttpClient) { }
  rentalPost  =  new RentalPost();
  private rentalDetailFilter = new RentalDetailFilter();


  getRentalDetailFilter(){
    return this.rentalDetailFilter;
  }



  saveRentalPostInformation(rentalPost:RentalPost):void{
    this.rentalPost = rentalPost;
  }

  getRentalPostInformation():RentalPost{
    
    return this.rentalPost;
  }

  getRentals(rentalDetailFilter:RentalDetailFilter):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getdetails"
    return this.httpClient.post<ListResponseModel<Rental>>(newPath,rentalDetailFilter)
  }


  addRental(rentalPost:RentalPost, paymentPost:PaymentPost):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/add"
    let rentalPayment:RentalPayment = new RentalPayment();
    rentalPayment.rental = rentalPost;
    rentalPayment.payment = paymentPost;
    return this.httpClient.post<ResponseModel>(newPath,rentalPayment);
  }
  
  isRentable(rentalPost:RentalPost){
    let newPath = this.apiUrl + "rentals/isrentable"
    return this.httpClient.post<ResponseModel>(newPath, rentalPost);
  }

  
}
