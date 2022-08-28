import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { pprbanks,reportreq,reportresp } from './ppr_model';

@Injectable({
  providedIn: 'root'
})
export class PprserviceService {

  pprbanks=environment.pprbanksurl;
  pprpreporturl=environment.pprreporturl;

  constructor(private http:HttpClient) { }

  ReturnBanks(): Observable<pprbanks[]>{
    return this.http.post<pprbanks[]>(this.pprbanks,{responseType:'json'})
  }
  GenerateReport(data:reportreq): Observable<reportresp>{
    return this.http.post<reportresp>(this.pprpreporturl,data,{responseType:'json'});
  }
}
