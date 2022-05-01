import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardurl=environment.dashboardurl;
  dashboardurl2=environment.dashboardurl2;
  searchdashboardurl=environment.searchdashboardurl;
  dashboardanalyticsurl=environment.dashboardanalytics;
  dashanalysis=environment.dashboardanalysisurl;

  constructor(public http:HttpClient) { }

  FetchDashboard(): Observable<dashboardResp[]>{
    return this.http.get<dashboardResp[]>(this.dashboardurl,{responseType:'json'});
  }
  FetchDashboardReload(): Observable<dashboardResp[]>{
    return this.http.get<dashboardResp[]>(this.dashboardurl,{responseType:'json'});
  }
  SearchDashboard(data:SearchDashboardReq): Observable<dashboardResp[]>{
    //return this.http.get<dashboardResp[]>(this.searchdashboardurl+'/'+d,{responseType:'json'});
	return this.http.post<dashboardResp[]>(this.searchdashboardurl,data,{responseType:'json'});
  }
  DashboardAnalytics(): Observable<any[]>{
    return this.http.get<any[]>(this.dashboardanalyticsurl,{responseType:'json'});
  }
  DashAnalysis(data:DashAnalysisReq): Observable<AnalysisResponse>{
    return this.http.post<AnalysisResponse>(this.dashanalysis,data,{responseType:'json'});
  }
}


export interface dashboardResp{
  bankID:number;
  bankName:string;
  bankCode:string;
  bankLogo:string;
  totalRate:number;
}

export interface DashAnalysisReq{
	bankCode:string;
}
export interface AnalysisResponse{
	InLast5Vol:number;
	InLast5Failed:number;
	InLast5Success:number;
	InLast5SuccessRate:number;
	InLast5Summary:InLast5Summary[];
	DailyInVol: number;
	DailyInFailed: number;
	DailyInSuccess: number;
	DailyInSuccessRate: number;
	DailyInFailedRate:number;
	DailyInSummary:DailyInSummary[];
	OutLast5Vol: number,
	OutLast5Failed: number,
	OutLast5Success: number,
	OutLast5SuccessRate:number;
	OutLast5Summary:OutLast5Summary[];
	DailyOutVol:number;
	DailyOutFailed:number;
	DailyOutSuccess:number;
	DailyOutSuccessRate:number;
	DailyOutFailedRate:number;
	DailyOutSummary:DailyOutSummary[];
	DateLabel:string;
	LabelLastFive:string;
	InDailySuccessCnt:number;
	OutDailySuccessCnt:number;
	Out5Cnt:number;
	In5Cnt:number;
}
export interface InLast5Summary{
	Code:string;
	CodeName:string;
	CodeCount:number;
}
export interface DailyInSummary{
	Code:string;
	CodeName:string;
	CodeCount:number;
}
export interface OutLast5Summary{	
	Code:string;
	CodeName:string;
	CodeCount:number;
}
export interface DailyOutSummary{
	Code:string;
	CodeName:string;
	CodeCount:number;
}
export interface SearchDashboardReq{
	bankName:string;
}