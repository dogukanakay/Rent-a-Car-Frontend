import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { RentalPost } from '../models/rentalPost';
import { EntityResponseModel } from '../models/entityResponseModel';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44338/api/Rentals'
  constructor(private httpClient:HttpClient) { }
  private rentalPostKey = "rental_post_key"
  
  saveRentalPostInformation(rentalPost:RentalPost):void{
    localStorage.setItem(this.rentalPostKey, JSON.stringify(rentalPost))
  }

  getRentalPostInformation():RentalPost{
    const savedRentalPostInformation = localStorage.getItem(this.rentalPostKey)
    return savedRentalPostInformation? JSON.parse(savedRentalPostInformation) : null;
  }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "/getdetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }
  addRental(rentalPost:RentalPost):Observable<ResponseModel>{
    let newPath = this.apiUrl + "/add"
    return this.httpClient.post<ResponseModel>(newPath,rentalPost);
  }
  
  isRentable(rentalPost:RentalPost){
    let newPath = this.apiUrl + "/isrentable"
    return this.httpClient.post<ResponseModel>(newPath, rentalPost);
  }

  
}
