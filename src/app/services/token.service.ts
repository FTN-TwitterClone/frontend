import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string){
    sessionStorage.setItem('token',token)
  }
  removeToken(){
    sessionStorage.removeItem('token')
  }
}
