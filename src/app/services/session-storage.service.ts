import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }


  setItem(key:string, value:string){

    return sessionStorage.setItem(key,value)
  }

  getItem(key:string){
    
    return sessionStorage.getItem(key)
  }

  removeItem(key:string){

    return sessionStorage.removeItem(key)
  }
}
