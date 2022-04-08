import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardurl=environment.dashboardurl;
  searchdashboardurl=environment.searchdashboardurl;
  dashboardanalyticsurl=environment.dashboardanalytics;

  constructor(public http:HttpClient) { }

  FetchDashboard(): Observable<dashboardResp[]>{
    return this.http.get<dashboardResp[]>(this.dashboardurl,{responseType:'json'});
  }
  SearchDashboard(d): Observable<dashboardResp[]>{
    return this.http.get<dashboardResp[]>(this.searchdashboardurl+'/'+d,{responseType:'json'});
  }
  DashboardAnalytics(): Observable<any[]>{
    return this.http.get<any[]>(this.dashboardanalyticsurl,{responseType:'json'});
  }
}


export interface dashboardResp{
  bankID:number;
  bankName:string;
  bankCode:string;
  bankLogo:string;
  totalRate:number;
}