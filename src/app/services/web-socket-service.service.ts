import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber,BehaviorSubject } from 'rxjs';
//import { Socket } from 'ngx-socket-io';  
import { map, subscribeOn } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  //socket: SocketIOClient.Socket;
  //socket:any;
  data: any = [];
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() { 
    //this.socket=io.connect('http://localhost:8586')
  }
  socket = io('http://localhost:8586');
  /*listen(eventname: String): Observable<any>{
    return new Observable((subscribe)=>{
       this.socket.on(eventname,(data)=>{
         subscribe.next(data);
       })
    })
  }*/
  public listen = () => {
    this.socket.on('loadDashboardData', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
  /*FetchDash() {
		this.sockets.emit('loadDashboardData');
	} */

  //FetchDashboard(){
   // return this.sockets.fromEvent('loadDashboardData');

 // return this.sockets.fromEvent('loadDashboardData').subscribe((e) => {
     // console.log(e);
    //});
   // return this.sockets.fromEvent('loadDashboardData');
    //return  this.sockets.fromEvent('loadDashboardData').pipe(map((data: any) => {
    //console.log('ssssss')
    //return data;
//}))
  //}
}
