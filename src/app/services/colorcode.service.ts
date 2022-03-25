import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorcodeService {
  colorcodeurl=environment.colorcodeurl;
  updatecoloururl=environment.updatecoloururl;
  addcoloururl=environment.addcoloururl;

  constructor(private http:HttpClient) { }

  FetchColors(): Observable<ColorCodeResponse[]>{
    return this.http.get<ColorCodeResponse[]>(this.colorcodeurl,{responseType:'json'});
    
  }
  UpdateColourCode(data: UpdateColourRequest): Observable<ColourResponse>{
    return this.http.post<ColourResponse>(this.updatecoloururl,data,{responseType:'json'});
  }
  AddColourCode(data: AddColourCode): Observable<ColourResponse>{
    return this.http.post<ColourResponse>(this.addcoloururl,data,{responseType:'json'});
  }
  

}

export interface AddColourCode{
  statusName:string;
	startingValue:number;
	endValue:number;
	colour:string;
  status:number;
}

export interface UpdateColourRequest{
  statusName:string;
	startingValue:number;
	endValue:number;
	colour:string;
	displayID:number,
  status:number;
}

export interface ColourResponse{
  responseCode:string;
  responseMessage:string;
}


export interface ColorCodeResponse{
  displayID:number;
  statusName:string;
  startingValue:number;
  endValue:number;
  color:string;
  status:number;
}
