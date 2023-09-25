import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car, CarDetailFilter, CarPost } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { EntityResponseModel } from '../models/entityResponseModel';
import { Image } from '../models/image';
import { environment } from 'src/environments/environment.development';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl
  private carDetailFilter = new CarDetailFilter();

  constructor(private httpClient : HttpClient, private sessionStorageService:SessionStorageService) { }
  
  
  
  setCarDetailFilter(carDetailFilter: CarDetailFilter) {
    this.carDetailFilter = carDetailFilter;
    this.sessionStorageService.setItem(
      'carFilters',
      JSON.stringify(this.carDetailFilter)
    );
  }

  getCarDetailFilter() {
    const savedFilterJson = this.sessionStorageService.getItem('carFilters');
    if (savedFilterJson) {
      this.carDetailFilter = JSON.parse(savedFilterJson);
    }
    return this.carDetailFilter;
  }

  getCars(carDetailFilter:CarDetailFilter):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getcardetails"
    return this.httpClient.post<ListResponseModel<Car>>(newPath,carDetailFilter);
  }


  getCarDetailsByCarId(carId:number):Observable<EntityResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcardetailsbycarid?carId="+carId;
    return this.httpClient.get<EntityResponseModel<Car>>(newPath);
  }

  getCarByCarId(carId:number):Observable<EntityResponseModel<CarPost>>{
    let newPath = this.apiUrl+"cars/getcarbycarid?carId="+carId;
    return this.httpClient.get<EntityResponseModel<CarPost>>(newPath);
  }
  


  carAdd(carPost:CarPost):Observable<ResponseModel>{
    let newPath = this.apiUrl+"cars/add"
    return this.httpClient.post<ResponseModel>(newPath,carPost)
  }

  carUpdate(carPost:CarPost):Observable<ResponseModel>{
    let newPath = this.apiUrl+"cars/update"
    return this.httpClient.post<ResponseModel>(newPath,carPost)
  }
}
