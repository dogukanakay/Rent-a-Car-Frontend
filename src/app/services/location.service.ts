import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalLocation } from '../models/rentalLocation';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient:HttpClient) { }

  apiUrl=environment.apiUrl

  getRentalLocations(){
    let newPath = this.apiUrl + 'rentallocations/getall'
    return this.httpClient.get<ListResponseModel<RentalLocation>>(newPath);
  }

  addRentalLocation(rentalLocation:RentalLocation){
    let newPath = this.apiUrl + 'rentallocations/add'
    return this.httpClient.post<ResponseModel>(newPath, rentalLocation);
  }
}
