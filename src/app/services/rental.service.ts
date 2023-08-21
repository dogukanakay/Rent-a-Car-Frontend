import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental, RentalFilter } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { RentalPost } from '../models/rental';
import { EntityResponseModel } from '../models/entityResponseModel';
import { JsonPipe } from '@angular/common';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl=environment.apiUrl
  constructor(private httpClient:HttpClient) { }
  private rentalPostKey = "rental_post_key"
  
  saveRentalPostInformation(rentalPost:RentalPost):void{
    localStorage.setItem(this.rentalPostKey, JSON.stringify(rentalPost))
  }

  getRentalPostInformation():RentalPost{
    const savedRentalPostInformation = localStorage.getItem(this.rentalPostKey)
    return savedRentalPostInformation? JSON.parse(savedRentalPostInformation) : null;
  }

  getRentals(rentalFilter:RentalFilter):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getdetails"
    return this.httpClient.post<ListResponseModel<Rental>>(newPath,rentalFilter)
  }
  addRental(rentalPost:RentalPost):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rentalPost);
  }
  
  isRentable(rentalPost:RentalPost){
    let newPath = this.apiUrl + "rentals/isrentable"
    return this.httpClient.post<ResponseModel>(newPath, rentalPost);
  }

  
}
