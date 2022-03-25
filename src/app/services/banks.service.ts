import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { Bankresponse } from 'src/app/services/banks.service';


@Injectable({
  providedIn: 'root'
})
export class BanksService {
  listbankurl=environment.listbankurl;
  updatebankurl=environment.updatebankurl;
  addbankurl=environment.addbankurl;
  searchbankurl=environment.searchbankurl;
  checkcodeurl=environment.checkcodeurl;

  constructor(public http:HttpClient) { }

  
  FetchBanks(): Observable<Bankresponse[]>{
    return this.http.get<Bankresponse[]>(this.listbankurl,{responseType:'json'});
  }
  UpdateBank(data:UpdateBankRequest): Observable<UpdateBankResponse>{
    return this.http.post<UpdateBankResponse>(this.updatebankurl,data,{responseType:'json'});
  }
  CreateBank(data:AddBankReq): Observable<AddBankResp>{
    return this.http.post<AddBankResp>(this.addbankurl,data,{responseType:'json'});
  }
  SearchBank(d): Observable<Bankresponse[]>{
    return this.http.get<Bankresponse[]>(this.searchbankurl+'/'+d,{responseType:'json'});
  }
  CheckCode(d): Observable<CheckCodeResp>{
    return this.http.get<CheckCodeResp>(this.checkcodeurl+'/'+d,{responseType:'json'});
  }
}

export interface Bankresponse{
  bankID:number;
  bankName:string;
  bankCode:string;
bankEmail:string;	
bankPhone:string;
  bankLogo:string;
failureThreshold:number;
  volumeThreshold:number;
bankType:number;
  bankStatus:number;
  
}

export interface UpdateBankRequest{
  bankID:number;
  bankName:string;
  bankCode:string;
bankEmail:string;	
bankPhone:string;
  bankLogo:string;
failureThreshold:number;
  volumeThreshold:number;
bankType:number;
  bankStatus:number;
}

export interface UpdateBankResponse{
  responseCode:string;
  responseMessage:string;
}

export interface AddBankReq{
  bankName:string;
	bankCode:string;
	bankEmail:string;
	bankPhone:string;
	bankLogo:string;
	failureThreshold:number;
	volumeThreshold:number;
	bankType:number;
	CreatedBy:number;
}
export interface AddBankResp{
  responseCode:string;
  responseMessage:string;
}
export interface searchBankreq{
  name:string;
}
export interface CheckCodeResp{
  count:number;
}