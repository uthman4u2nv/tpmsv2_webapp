
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authurl=environment.authurl;
  constructor(public http:HttpClient) { }
  Login(data: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.authurl,data,{responseType:'json'});
  }
}

export interface LoginRequest{
  email:string;
  password:string;
}

export interface LoginResponse{
  responseCode:string;
  responseMessage:string;
  email:string;
  fullnames:string;
  phone:string;
  bank:number;
  role:number;
  dateJoined:string;
  roleName:string;
  bankName:string;
  userID:number;
  status:number;

	
}
