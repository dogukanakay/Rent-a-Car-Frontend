import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ListResponseModel } from '../models/listResponseModel';
import { CarClass } from '../models/carClass';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarClassService {
  
  constructor(private httpClient:HttpClient) { }

  apiUrl = environment.apiUrl;


  getCarClasses(){
    let newPath = this.apiUrl+'carclasses/getall'
    return this.httpClient.get<ListResponseModel<CarClass>>(newPath);
  }

  addCarClass(carClass:CarClass){
    let newPath = this.apiUrl+'carclasses/add'
    return this.httpClient.post<ResponseModel>(newPath,carClass);
  }
}
