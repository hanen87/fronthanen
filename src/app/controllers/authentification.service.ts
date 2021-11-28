import { LoginRequest } from './../models/login-request';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  httpheaders=new HttpHeaders({
    'Authorization': localStorage.getItem("token")!
  })

  loginStatus:boolean=localStorage.getItem('loginIn')?true:false
  
  constructor(
    private http: HttpClient,
    private router:Router     
    ) {

  }

  Login(RequestLogin: LoginRequest) {
    return this.http.post(`${environment.baseurl}/users/login`, RequestLogin)
  }

  Register(RequestRegister: any,idetab:any) {

    return this.http.post(`${environment.baseurl}/users/register1/${idetab}`, RequestRegister)

  }

  Logout(Rtoken:any){
    return this.http.post(`${environment.baseurl}/user/logout`, {"refreshToken":Rtoken},{headers:this.httpheaders})
  }
 

  forgetPass(data: any){
    return this.http.put(`${environment.baseurl}/user/forgetPass`,data)
  }
  reset(data: any){
    console.log("data",data);
    return this.http.put(`${environment.baseurl}/user/reset`,data)
  }

  getloginstatus(){
    return localStorage.getItem("loginIn")?true:false;
  }
  
  setloginstatus(x:any){
    this.loginStatus=x
  }
  
}
