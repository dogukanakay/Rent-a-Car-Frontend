import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:44338/api/brands';
  constructor(private httpClient : HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl+"/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  brandAdd(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl+"/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
