import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { EntityResponseModel } from '../models/entityResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = environment.apiUrl;



  getUserDetail(){
    let newPath = this.apiUrl + "users/getbyemail";

    return this.httpClient.get<EntityResponseModel<User>>(newPath);
  }

  updateUser(){}
}
