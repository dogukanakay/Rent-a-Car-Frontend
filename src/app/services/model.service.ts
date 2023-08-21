import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ListResponseModel } from '../models/listResponseModel';
import { Model } from '../models/model';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private httpClient : HttpClient) { }
  
  apiUrl = environment.apiUrl

  getModels(){
    let newPath = this.apiUrl + 'models/getall'
    return this.httpClient.get<ListResponseModel<Model>>(newPath)
  }

  addModel(model:Model){
    let newPath = this.apiUrl + 'models/add'
    return this.httpClient.post<ResponseModel>(newPath, model)
  }
}
