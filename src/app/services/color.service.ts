import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl= environment.apiUrl
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl+"colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  colorAdd(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl+"colors/add"
    return this.httpClient.post<ResponseModel>(newPath,color)
  }

  colorUpdate(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl+"colors/update"
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
}
