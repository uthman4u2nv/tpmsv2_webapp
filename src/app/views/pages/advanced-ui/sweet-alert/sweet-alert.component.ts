import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { ColumnMode,SelectionType } from '@swimlane/ngx-datatable';
import { DashboardService } from '../../../../services/dashboard.service'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-sweet-alert',
  templateUrl: './sweet-alert.component.html'
})
export class SweetAlertComponent implements OnInit {

  @Input() Obj={bankCode:"",bankName:"",bankLogo:""}
  row:any=[];
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
  @ViewChild('fullScreen') divRef;

  constructor(public dash:DashboardService,private _sanitizer: DomSanitizer,private modalService: NgbModal) { }


  
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
    this.FetchDashboard();

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
  FetchDashboard(){
    this.dash.FetchDashboard().subscribe(d=>{
     // console.log(d);
      this.row=d;
    },(err: HttpErrorResponse)=>{

    })
  }

  SearchDashboard(event):any{
    
    if(event.target.value===""){
      this.FetchDashboard();
    return;
    }
    this.dash.SearchDashboard(event.target.value).subscribe(d=>{
     // console.log(d);
     this.row=d;
    },(err: HttpErrorResponse) => {
      
     // console.log (err.message);
    })
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
    
    this.openBasicModal(content);
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
      console.log("Incoming Analyticssss:"+"["+this.incomingdata+"]");
      
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

  openBasicModal(content) {
    this.FetchIncomingAnalytics();
    this.FetchOutgoingAnalytics();
    //this.incomingdata=[86,114,106,106,107,111,133,221,783,2478];
    //this.outgoingdata=[282,350,411,502,635,809,947,1402,3700,5267];


    console.log("Incoming Data:"+this.incomingdata);
    console.log("Outgoing Data:"+this.outgoingdata);
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      //this.basicModalCloseResult = "Modal closed" + result
      
    }).catch((res) => {});
  }

}
