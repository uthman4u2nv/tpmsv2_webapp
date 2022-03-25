import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwitcherrorsService {

  listerrorurl=environment.listerrorurl;
  updateerrorurl=environment.updateerrorurl;
  adderrorurl=environment.adderrorcodeurl;
  searcherrorurl=environment.searcherrorcodeurl;
  constructor(public http:HttpClient) { }

  FetchErrors(): Observable<SwitchErrorResponse[]>{
    return this.http.get<SwitchErrorResponse[]>(this.listerrorurl,{responseType:'json'});
  }
  UpdateError(data:updateRequest): Observable<updateResponse>{
    return this.http.post<updateResponse>(this.updateerrorurl,data,{responseType:'json'});
  }
  CreateError(data:AddErrorCodeRequest): Observable<AddErrorCodeResponse>{
    return this.http.post<AddErrorCodeResponse>(this.adderrorurl,data,{responseType:'json'});
  }
  SearchError(d): Observable<SwitchErrorResponse[]>{
    return this.http.get<SwitchErrorResponse[]>(this.searcherrorurl+'/'+d,{responseType:'json'});
  }
}

export interface SwitchErrorResponse{
  errorCodeID:number;
  errorCode:string;
  errorCodeName:string;
  errorCodeDesc:string;
  errorCodeType:number;
  errorCodeStatus:number;

}
export interface updateRequest{
  errorCode:string;
  errorCodeName:string;
  errorCodeDesc:string;
  errorCodeType:number;
  errorCodeStatus:number;
  errorCodeID:number;
}

export interface updateResponse{
  responseCode:string;
  responseMessage:string;
}

export interface AddErrorCodeRequest{
  errorCode:string;
  errorCodeName:string;
  errorCodeDesc:string;
  errorCodeType:number;
}
export interface AddErrorCodeResponse{
  responseCode:string;
  responseMessage:string;
}

