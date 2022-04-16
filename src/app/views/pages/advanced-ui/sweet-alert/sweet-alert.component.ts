import { Component, Injectable, Input, OnInit,ViewChild } from '@angular/core';
import { ColumnMode,SelectionType } from '@swimlane/ngx-datatable';
import { DashboardService } from '../../../../services/dashboard.service'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';
import { WebSocketServiceService } from '../../../../services/web-socket-service.service';




@Component({
  selector: 'app-sweet-alert',
  templateUrl: './sweet-alert.component.html'
})
@Injectable()
export class SweetAlertComponent implements OnInit {

  @Input() Obj={bankCode:"",bankName:"",bankLogo:""}
  @Input() Obj2={bankCode:""}
  @Input() Obj3={bankName:""}
  row:any=[];
  temp:any=[];
  bankName:string="";
  bankLogo:string="";
  bankCode:string="";
  reorderable = true;
  ColumnMode = ColumnMode;
  selected: any[] = [];
  SelectionType = SelectionType;
  defaultNavActiveId=1;
  incomingdata:any[]=[];
  outgoingdata:any[]=[];
  displaytime="";
  mydata:"";
  blackout:boolean=false;
  @ViewChild('fullScreen') divRef;

  
//
  constructor(public dash:DashboardService,private _sanitizer: DomSanitizer,private modalService: NgbModal,private wss:WebSocketServiceService) {


   }
   //Analytics variables
   InVollast5:any=0;
   InFailedLast5:any=0;
   InSuccessLast5:any=0;
   InSuccessRateLast5:any=0;
   InFailedRateLast5:any=0
   
   InVolDaily:any=0;
   InFailedDaily:any=0;
   InSuccessDaily:any=0;
   InSuccessRateDaily:any=0;
   InFailedRateDaily:any=0;
   
   Last5Summary:any=[];
   DailySummary:any=[];
   
   OutVollast5:any=0;
   OutFailedLast5:any=0;
   OutSuccessLast5:any=0;
   OutSuccessRateLast5:any=0;
   OutFailedRateLast5:any=0
   
   OutVolDaily:any=0;
   OutFailedDaily:any=0;
   OutSuccessDaily:any=0;
   OutSuccessRateDaily:any=0;
   outFailedRateDaily:any=0;
   
   Last5SummaryOut:any=[];
   DailySummaryOut:any=[];
  


  
  public lineChartData: ChartDataSets[] = [
    //{ data: [86,114,106,106,107,111,133,221,783,2478], label: 'Incoming', fill: true },
    //{ data: [282,350,411,502,635,809,947,1402,3700,5267], label: 'Outgoing', fill: true }
    { data: [86,114,106,106,107,111,133,221,783,2478], label: 'Incoming', fill: false },
    { data: [282,350,411,502,635,809,947,1402,3700,5267], label: 'Outgoing', fill: false }
  ];
  public lineChartData1: ChartDataSets[] = [
    { data: [67,145,11,106,107,199,133,288,687,345], label: 'Incoming', fill: true },
    { data: [200,199,375,502,635,809,947,1402,3700,5267], label: 'Outgoing', fill: true }
  ];
  public lineChartLabels: Label[] = ['1500','1600','1700','1750','1800','1850','1900','1950','1999','2050'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  public lineChartLabels1: Label[] = ['1500','1600','1700','1750','1800','1850','1900','1950','1999','2050'];
  public lineChartOptions1: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#7ee5e5',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    {
      borderColor: '#f77eb9',
      backgroundColor: 'rgba(0,0,0,0)',
    }
  ];
  public lineChartColors1: Color[] = [
    {
      borderColor: '#7ee5e5',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    {
      borderColor: '#f77eb9',
      backgroundColor: 'rgba(0,0,0,0)',
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  public lineChartLegend1 = true;
  public lineChartType1: ChartType = 'line';
  public lineChartPlugins1 = [];

  public doughnutChartLabels: Label[] = ["In", "Out"];
  public doughnutChartData: SingleDataSet = [24,42];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = [
    { backgroundColor: ["#7ee5e5","#f77eb9"] }
  ];

  ngOnInit(): void {
    this.blackout=true;
    this.FetchDashboard();
    //this.LoadDashboard();
    //this.wss.FetchDash();
    //this.wss.FetchDashboard().subscribe((data: any) => this.row = data)
    //this.wss.Fet().subscribe((data: any) => console.log(data))
    this.wss.listen().subscribe((data)=>{
      this.row=data;
      this.DisplayDashboard(data);console.log("dataaaaa"+data)
    },error=>{
      console.log(error+"Error");
    });

  }

  LoadDashboard(){
    this.wss.listen().subscribe(d=>{
      this.row=d;
    },(error)=>{console.log(error)})
  }
  DispData(data){
    //console.log("Pushed Data:"+data);
    this.mydata=data;
  }
  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    const elem = this.divRef.nativeElement;
  
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
  DisplayLabel(data){
    for (let key in data) {
      let value = data[key];
this.displaytime=value.datetimelabel;
      // Use `key` and `value`
  }
  }
  DisplayDashboard(data){
    //console.log("Dataaaa:"+data);
    this.DisplayLabel(data);
    this.row=data;
  }
  FetchDashboard(){
    this.dash.FetchDashboard().subscribe(d=>{
     this.blackout=false;
      this.row=d;
      this.DisplayLabel(d);
    },(err: HttpErrorResponse)=>{

    })
  }
  FetchDashboardReload(){
    this.dash.FetchDashboard().subscribe(d=>{
      this.blackout=false;
       this.row=d;
       
     },(err: HttpErrorResponse)=>{
 
     })
  }

  SearchDashboard(event):any{
        if(event.target.value===""){
      this.FetchDashboard();
    return;
    }
    let v=event.target.value;
    this.Obj3.bankName=v;
    
    this.dash.SearchDashboard(this.Obj3).subscribe(d=>{
      this.blackout=false;
       this.row=d;
       
     },(err: HttpErrorResponse)=>{
 
     })
    //alert("hhh:"+this.row.filter(e => e.bankName === v));
    this.row=this.row.filter(e => e.bankName === v);
    
      
    
    
    
    
   
  }

 // onSelect(event,content) {
  onSelect(bankName,bankLogo,bCode,content) {
    
    
    //this.bankName=this.selected[0].bankName;
    //this.bankLogo=this.selected[0].bankLogo;
	
    this.bankName=bankName;
    this.bankLogo=bankLogo;
    this.bankCode=bCode;
    console.log("Bank Code:"+bCode);
   this.incomingdata.push(this.FetchIncomingAnalytics());
   this.FetchOutgoingAnalytics();
    
    //this.Obj={bankCode:bCode,bankName:bankName,bankLogo:bankLogo}
    
    this.openBasicModal(content,bCode);
   }

   FetchIncomingAnalytics(){
    let dd=[];
    let i=0;
    this.dash.DashboardAnalytics().subscribe(d=>{
      console.log("ooooo"+d.length);
      dd.push(d);
      
      this.incomingdata.push(dd);
      return dd;
      //return "["+this.incomingdata+"]";
      //console.log("Incoming Analyticssss:"+"["+this.incomingdata+"]");
      
    },(err: HttpErrorResponse)=>{

    })
    
    
   }
   FetchOutgoingAnalytics(){
    let dd=[];
    this.dash.DashboardAnalytics().subscribe(d=>{
      console.log(d);
      dd.push(d)
      this.outgoingdata.push(dd);
      console.log("Outgoing Analytics:"+dd);
      
      
    },(err: HttpErrorResponse)=>{

    })
   
  }

  openBasicModal(content,bCode) {
	  //alert(bCode);
	  this.Obj2.bankCode=bCode;
	  //alert("Obj"+JSON.stringify(this.Obj2));
	  this.dash.DashAnalysis(this.Obj2).subscribe(d=>{
		 // alert("D:"+d);
		   this.InVollast5=d.InLast5Vol;
   this.InFailedLast5=d.InLast5Failed;
   this.InSuccessLast5=d.InLast5Success;
   this.InSuccessRateLast5=d.InLast5SuccessRate;
   this.InFailedRateLast5=0;
   
   this.InVolDaily=d.DailyInVol;
   this.InFailedDaily=d.DailyInFailed;
   this.InSuccessDaily=d.DailyInSuccess;
   this.InSuccessRateDaily=d.DailyInSuccessRate;
   this.InFailedRateDaily=d.DailyInFailedRate;
   this.DailySummary=d.DailyInSummary;
   this.Last5Summary=d.InLast5Summary;
   
   this.OutVollast5=d.OutLast5Vol;
   this.OutFailedLast5=d.OutLast5Failed;
   this.OutSuccessLast5=d.OutLast5Success;
   this.OutSuccessRateLast5=d.OutLast5SuccessRate;
   this.OutFailedRateLast5=100-d.OutLast5SuccessRate;
   
   this.OutVolDaily=d.DailyOutVol;
   this.OutFailedDaily=d.DailyOutFailed;
   this.OutSuccessDaily=d.DailyOutSuccess;
   this.OutSuccessRateDaily=d.DailyOutSuccessRate;
   this.outFailedRateDaily=d.DailyOutFailedRate;
   
   this.Last5SummaryOut=d.OutLast5Summary;
   this.DailySummaryOut=d.DailyOutSummary;
		  
	  },(err: HttpErrorResponse)=>{
		  alert(err.message+"error");
		  console.log(err.message);
	  })
	  
    this.FetchIncomingAnalytics();
    this.FetchOutgoingAnalytics();
     console.log("Incoming Data:"+this.incomingdata);
    console.log("Outgoing Data:"+this.outgoingdata);
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      //this.basicModalCloseResult = "Modal closed" + result
      
    }).catch((res) => {});
  }

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