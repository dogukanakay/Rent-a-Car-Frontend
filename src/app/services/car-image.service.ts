import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Image, ImagePost } from '../models/image';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = environment.apiUrl

  constructor(private httpClient:HttpClient) { }





  getImagesByCarId(carId:number):Observable<ListResponseModel<Image>>{
    let newPath = this.apiUrl+"carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }

  addImage(file:File, imagePost:ImagePost){
    const formData: FormData = new FormData()
    formData.append('file', file, file.name)
    formData.append('carImages',JSON.stringify(imagePost))
    let newPath = this.apiUrl+"carimages/add"
    return this.httpClient.post<ResponseModel>(newPath,formData)

  }
}
