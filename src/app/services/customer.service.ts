import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl=environment.apiUrl

  constructor(private httpClient : HttpClient) { }
  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+'customers/getdetails'
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
