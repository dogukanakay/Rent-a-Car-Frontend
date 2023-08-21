import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ListResponseModel } from '../models/listResponseModel';
import { Fuel } from '../models/fuel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  constructor(private httpClient:HttpClient) { }

  apiUrl=environment.apiUrl

  getFuelTypes(){
    let newPath = this.apiUrl + 'fueltypes/getall'
    return this.httpClient.get<ListResponseModel<Fuel>>(newPath);
  }

  addFuelType(fuel:Fuel){
    let newPath = this.apiUrl + 'fueltypes/add'
    return this.httpClient.post<ResponseModel>(newPath, fuel);
  }

}
