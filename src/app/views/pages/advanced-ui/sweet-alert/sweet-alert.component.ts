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
import * as Chart from 'chart.js';
import ApexCharts from 'apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";



@Component({
  selector: 'app-sweet-alert',
  templateUrl: './sweet-alert.component.html'
})
@Injectable()
export class SweetAlertComponent implements OnInit {

  canvas:any; ctx:any; canvas2:any; ctx2:any; canvas3:any; ctx3:any;
  
  @Input() Obj={bankCode:"",bankName:"",bankLogo:""}
  @Input() Obj44={bankCode:""}
  @Input() Obj2={bankCode:""}
  @Input() Obj3={bankName:""}
  p:any=[];
  q:any=[];
  pp:VolumeGraphIn[]=[];
  retrievedData:AnalysisResponse;
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
  IndinRate=0;
  IndinVolume=0;
  IndoutRate=0;
  IndoutVolume=0;
  mydata:"";
  blackout:boolean=false;
  @ViewChild('fullScreen') divRef;

  
//
  constructor(public dash:DashboardService,private _sanitizer: DomSanitizer,private modalService: NgbModal,private wss:WebSocketServiceService) {
    this.wss.listen().subscribe((data)=>{
      this.row=data;
      this.DisplayDashboard(data);console.log("dataaaaa"+data);
      
    },error=>{
      console.log(error+"Error");
    });

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
   VolGraphIn:any=[];
   VolGraphOut:any=[];
   VolGraphInLabel:any=[];
   VolGraphOutLabel:any=[];
   
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
   LabelLastFive="";
   DateLabel="";
   InDailySuccessCnt:number=0;
	OutDailySuccessCnt:number=0;;
	Out5Cnt:number=0;
	In5Cnt:number=0;

  In5SuccessRate:number=0;
  In5FailureRate:number=0;
  InDailySuccessRate:number=0;
  InDailyFailureRate:number=0;

  Out5SuccessRate:number=0;
  Out5FailureRate:number=0;
  OutDailySuccessRate:number=0;
  OutDailyFailureRate:number=0;
  blackout2:boolean=false;

  /*chartData = {
    type: 'LineChart',
    data: [
    ["00:00",  500, 600],
    ["Feb",  800, 900],
    ["Mar",  400, 600],
    ["Apr",  600, 500],
    ["May",  400, 300],
    ["Jun",  750, 700],
    ["Jul",  800, 710],
    ["Aug",  810, 720],
    ["Sep",  820, 730],
    ["Oct",  900, 840],
    ["Nov",  910, 850],
    ["Dec",  920, 890]
 ],
 columnNames: ["Month", "Apple", "Mi"],
 options: {
 hAxis: {
       title: 'Month'
    },
    vAxis:{
       title: 'Sell'
    },
 },
 width: 1000,
 height: 400
};

*/
  


  
 /* public lineChartData: ChartDataSets[] = [
    { data: [86,114,106,106,107,111,133,221,783,2478,1100,1500,550,230,590,100,520,400,200,650,700,432,879,2300], label: 'Incoming', fill: false },
    { data: [282,350,411,502,635,809,947,1402,3700,5267,1600,1250,86,114,106,106,107,111,133,221,783,2478,1100,1500], label: 'Outgoing', fill: false }
    //{ data: this.VolGraphIn, label: 'Incoming', fill: false },
    //{ data: this.VolGraphOut, label: 'Outgoing', fill: false }
  ];*/
  public lineChartData: ChartDataSets[] = [
    //{ data: [67,145,11,106,107,199,133,288,687,345], label: 'Incoming', fill: true },
    { data: this.p, label: 'Incoming', fill: true },
    //{ data: [200,199,375,502,635,809,947,1402,3700,5267], label: 'Outgoing', fill: true }
    { data: this.q, label: 'Outgoing', fill: true }
  ];
  public lineChartData1: ChartDataSets[] = [
    { data: [67,145,11,106,107,199,133,288,687,345], label: 'Incoming', fill: true },
    { data: [200,199,375,502,635,809,947,1402,3700,5267], label: 'Outgoing', fill: true }
  ];
  public lineChartLabels: Label[] = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00'];
  public lineChartOptions: ChartOptions = {
    responsive: true
   /* scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }],
      xAxes: [{
        type: 'time',
        time: {
         // parser: timeFormat,
          displayFormats: {
            
            hour: 'HH:mm'
            //millisecond: 'HH:mm:ss.SSS',
            //second: 'HH:mm:ss',
            //minute: 'HH:mm',
            //hour: 'HH'
          },
         
        },
        
       // labels:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00'],
      }]
  }*/
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
    this.VolGraphIn=[0,0,0,0,0,0,0,0,0,0];
    this.VolGraphOut=[0,0,0,0,0,0,0,0,0,0];
    this.FetchDashboard();
    //this.LoadDashboard();
    //this.wss.FetchDash();
    //this.wss.FetchDashboard().subscribe((data: any) => this.row = data)
    //this.wss.Fet().subscribe((data: any) => console.log(data))
    
    

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
  Populate(d){
    console.log(d);
    //alert("hhhBankCode:"+d[key].bankCode)
    for (let key in d) {
      let value = d[key];

      this.Obj44.bankCode=value.bankCode;
      this.dash.PopulateData(this.Obj44).subscribe(dd=>{
        console.log("Bank Data Ddetails:"+dd);
       // this.p.push(this.rNumber(20,100))
        
        const arr: PopulateResp[] = [];
        const a1: PopulateResp = {
          bankCode:dd.bankCode,
          bankName: dd.bankName,
          inRate:15,
          outRate:15,
          inVolume:4,
          outVolume:4,
          bankLogo:dd.bankLogo,
          totalRate:99,
          IndInRate:4,
          IndOutRate:0,
          IndOutVolume:70,
          IndInVolume:50

          
        };
        
this.row.push(dd);
      })
    
    }
    /*Object.keys(d).forEach(function(key){
      
      this.Obj44.bankCode=d[key].bankCode;

      )*/

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
    this.FetchIndustryDashboard();
  }
  FetchDashboard(){
    this.dash.FetchDashboard().subscribe(d=>{
     this.blackout=false;
      //this.row=d;
     this.Populate(d);
      this.DisplayLabel(d);
      this.FetchIndustryDashboard();
    },(err: HttpErrorResponse)=>{

    })
  }
  FetchIndustryDashboard(){
    this.dash.FetchIndustryDashboard().subscribe(d=>{
     
      this.IndinRate=d.IndInRate;
      this.IndinVolume=d.IndInVolume;
      this.IndoutRate=d.IndOutRate;
      this.IndoutVolume=d.IndOutVolume;
      //this.DisplayLabel(d);
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
    
    this.openBasicModal(content,bCode,bankName);
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
  rNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  openBasicModal(content,bCode,bName) {

    //check the role
    let role=localStorage.getItem("role");
    let bankName=localStorage.getItem("bankName");
    if(role==="3" || role==="4"){
      if(bankName!=bName){
        return false;
      }
    }
    
    this.p.splice(0);
  this.q.splice(0);
    this.blackout2=true;
	 
	  this.Obj2.bankCode=bCode;
	  
	  this.dash.DashAnalysis(this.Obj2).subscribe(d=>{
		 
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
   this.VolGraphIn=d.VolGraphIn;
   this.VolGraphOut=d.VolGraphOut;
   
  //this.p=[];
  //this.q=[];
   for(let i=0; i<18;i++){
    this.p.push(this.rNumber(20,100))
   }
   for(let i=0; i<18;i++){
    this.q.push(this.rNumber(20,100))
   }

   
   //alert("Graph"+d.VolGraphIn[1].Cnt);
   
   
  /* d.VolGraphIn.forEach(mobile => {
    for (let key in mobile) {
        console.log(`${key}: ${mobile[key]}`);
    }
});*/
	
 
   /*for(let i=0; i<this.pp.length; i++){
    console.log("Date:"+this.pp[i].Cnt); //use i instead of 0
    
}*/

/*var options123 = {
  chart: {
    height: 380,
    width: "100%",
    type: "line",
    animations: {
      initialAnimation: {
        enabled: false
      }
    }
  },
  series: [
    {
      name: "Series 1",
      data: [
        [1486684800000, 34], 
        [1486771200000, 43], 
        [1486857600000, 31], 
        [1486944000000, 43], 
        [1487030400000, 33], 
        [1487116800000, 52]
      ]
    }
  ],
  xaxis: {
    type: 'datetime'
  }
};
*/
//var chart1 = new ApexCharts(document.querySelector("#chart123"), options123);

//chart1.render();
   


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
   this.LabelLastFive=d.LabelLastFive;
   this.DateLabel=d.DateLabel;

   this.InDailySuccessCnt=d.InDailySuccessCnt;
	this.OutDailySuccessCnt=d.OutDailySuccessCnt;
	this.Out5Cnt=d.Out5Cnt;
	this.In5Cnt=d.In5Cnt;

  this.In5SuccessRate=d.In5Cnt/d.InLast5Vol*100;
  this.In5FailureRate=100-(d.In5Cnt/d.InLast5Vol*100);
  this.InDailySuccessRate=(d.InDailySuccessCnt/d.DailyInVol)*100;
  this.InDailyFailureRate=100-((d.InDailySuccessCnt/d.DailyInVol)*100);

  this.Out5SuccessRate=d.Out5Cnt/d.OutLast5Vol*100;
  this.Out5FailureRate=100-(d.Out5Cnt/d.OutLast5Vol*100);
  this.OutDailySuccessRate=(d.OutDailySuccessCnt/d.DailyOutVol)*100;
  this.OutDailyFailureRate=100-((d.OutDailySuccessCnt/d.DailyOutVol)*100);
this.blackout2=false;

		  
	  },(err: HttpErrorResponse)=>{
		  //alert(err.message+"error");
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
export interface VolumeGraphIn{
	transDate:string;
	Cnt:number;
	Receipient:string;
}
export interface VolumeGraphOut{
	transDate:string;
	Cnt:number;
	Receipient:string;
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
	VolGraphIn:VolumeGraphIn[];
	VolGraphOut:VolumeGraphOut[];
}

export interface PopulateResp{
	bankName:string;
	bankLogo:string;
	bankCode:string;
	inRate:number;
	outRate:number;
	inVolume:number,
    outVolume: number,
    totalRate: number,
    IndInRate: number,
    IndOutRate: number,
    IndOutVolume: number,
    IndInVolume: number
}
