import { Injectable } from '@angular/core';
import { UserDetails } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = environment.apiUrl;



  getUserDetail(){
    let newPath = this.apiUrl + "users/getbyemail";

    return this.httpClient.get<EntityResponseModel<UserDetails>>(newPath);
  }

  updateUserDetails(userDetails:UserDetails)
  {
    let newPath = this.apiUrl +"users/updatebyuserdetaildto"
    return this.httpClient.post<ResponseModel>(newPath,userDetails)
  }
}
