import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { EntityResponseModel } from '../models/entityResponseModel';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44338/api/'

  constructor(private httpClient : HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getcardetailsbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getcardetailsbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }


  getCarsByBrandIdAndColorId(brandId:number, colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getcardetailsbybrandidandcolorid?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByCarId(carId:number):Observable<EntityResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcardetailsbycarid?carId="+carId;
    return this.httpClient.get<EntityResponseModel<Car>>(newPath);
  }
  getImagesByCarId(carId:number):Observable<ListResponseModel<Image>>{
    let newPath = this.apiUrl+"carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }
}
