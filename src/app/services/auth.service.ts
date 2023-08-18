import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Token } from '../models/token';
import { Register } from '../models/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl ='https://localhost:44338/api/'
  constructor(private httpClient:HttpClient) { }


  login(loginModel:Login){
    let newPath = this.apiUrl + 'auth/login'
    return this.httpClient.post<Token>(newPath,loginModel)
  }


  register(registerModel:Register){
    let newPath = this.apiUrl + 'auth/register'
    return this.httpClient.post<Token>(newPath,registerModel)
  }
}
