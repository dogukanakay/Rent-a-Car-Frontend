import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Token } from '../models/token';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from './local-storage.service';
import { ResponseModel } from '../models/responseModel';
import { EntityResponseModel } from '../models/entityResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = environment.apiUrl
  constructor(private httpClient:HttpClient, private localStorageServis:LocalStorageService) { }


  login(loginModel:Login){
    let newPath = this.apiUrl + 'auth/login'
    return this.httpClient.post<EntityResponseModel<Token>>(newPath,loginModel)
  }


  register(registerModel:Register){
    let newPath = this.apiUrl + 'auth/register'
    return this.httpClient.post<EntityResponseModel<Token>>(newPath,registerModel)
  }

  isAuthenticated(){
    let newPath = this.apiUrl+'auth/isauthenticated'
    return this.httpClient.get<ResponseModel>(newPath)

  }
}
