import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EfficiencyreportService {
  reporturl=environment.geteffreporturl;

  constructor(private http:HttpClient) { }


  GetReport(data: ReportRequest): Observable<EfficiencyReportResponse>{
    return this.http.post<EfficiencyReportResponse>(this.reporturl,data,{responseType:'json'});
  }
}


export interface ReportRequest{
  dateFrom:string;
  dateTo:string;
  sortCode:string;
}

export interface EfficiencyReportResponse {
  datetimelabel: string
  Inflow: Inflow[]
  Outflow: Outflow[]
  BankName:string
  Link:number

}

export interface Inflow {
  ENDDATE: string
  PCTEFF: number
  BANK: string
  RESPONSE_CODE: string
  DEFINITION: string
  WEEKLYRANK: number
  ORIENTATION: string
}

export interface Outflow {
  ENDDATE: string
  PCTEFF: number
  BANK: string
  RESPONSE_CODE: string
  DEFINITION: string
  WEEKLYRANK: number
  ORIENTATION: string
}