import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menurl=environment.menuURL;
  constructor(private http:HttpClient) { }

  ReturnMenu(data:menuReq): Observable<menuResp[]>{
    return this.http.post<menuResp[]>(this.menurl,data,{responseType:'json'});
  }
}


export interface menuReq{
  roleID:number;
}

export interface menuResp{
  label:string;
  icon:string;
  link:string;
  isTitle:boolean

}
