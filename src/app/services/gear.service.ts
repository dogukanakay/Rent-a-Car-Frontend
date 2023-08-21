import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Gear } from '../models/gear';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class GearService {

  constructor(private httpClient:HttpClient) { }

  apiUrl=environment.apiUrl

  getGearTypes(){
    let newPath = this.apiUrl + 'geartypes/getall'
    return this.httpClient.get<ListResponseModel<Gear>>(newPath);
  }

  addGearType(gear:Gear){
    let newPath = this.apiUrl + 'geartypes/add'
    return this.httpClient.post<ResponseModel>(newPath, gear);
  }
}
