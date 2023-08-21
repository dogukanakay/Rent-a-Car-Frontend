import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment, PaymentCard } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = environment.apiUrl

  getPayments(){
    let newPath = this.apiUrl +'payments/getall'
    return this.httpClient.get<ListResponseModel<Payment>>(newPath)
  }

  addPayment(payment:Payment){
    let newPath = this.apiUrl + 'payments/add'
    return this.httpClient.post<ResponseModel>(newPath,payment)
  }
  
  
  getPaymentCardByCustomerId(customerId:number){
    let newPath = this.apiUrl + 'paymentcards/getbycustomerid?customerid='+customerId
    return this.httpClient.get<ListResponseModel<PaymentCard>>(newPath)
  }

  addPaymentCard(paymentCard:PaymentCard){
    let newPath = this.apiUrl + 'paymentcards/add'
    return this.httpClient.post<ResponseModel>(newPath,paymentCard);
  }
}
