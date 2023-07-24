import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { RentalPost } from '../models/rentalPost';
import { EntityResponseModel } from '../models/entityResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44338/api/Rentals'
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "/getdetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }
  addRental(rentalPost:RentalPost):Observable<ResponseModel>{
    let newPath = this.apiUrl + "/add"
    return this.httpClient.post<ResponseModel>(newPath,rentalPost);
  }
  
  isRentable(carId:number, rentDate:Date, returnDate:Date){
    let newPath = this.apiUrl + "/isrentable"
    const queryParams = `carId=${carId}&rentDate=${rentDate}&returnDate=${returnDate}`;
    return this.httpClient.get(newPath + '?' + queryParams);
  }
}
