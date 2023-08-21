import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = environment.apiUrl
  constructor(private httpClient : HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl+"brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  brandAdd(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl+"brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  brandUpdate(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl+"brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
