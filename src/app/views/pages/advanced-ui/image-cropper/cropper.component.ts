import { Component, OnInit, ViewChild,Input,ElementRef } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';
import { BanksService } from '../../../../services/banks.service';
import { EfficiencyreportService } from '../../../../services/efficiencyreport.service';
import { GoogleChartComponent } from 'angular-google-charts';  
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



declare var google:any;

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;










@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {
  percentageValue: (value: number) => string;

  thresholdConfig = {
    '0': {color: 'green'},
    '6': {color: 'orange'},
    '10': {color: 'red'}
};
thresholdConfig2 = {
  '0': {color: 'red'},
  '40': {color: 'orange'},
  '80': {color: 'green'}
};
blackout:boolean=false;
  ch=80;
  dd=[];
  
  /**PDF SECTION */
  title = 'htmltopdf';
  data:0;
  
  

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  public convetToPDF() {
    var data = document.getElementById('mypdf');
    html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 230;
        var pageHeight = 315;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a3'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save(this.BankName+'.pdf'); // Generated PDF
    });
}
  
  public downloadAsPDF() {
   // const doc = new jsPDF();
   
   // const pdfTable = this.pdfTable.nativeElement;
   
  //  var html = htmlToPdfmake(pdfTable.innerHTML);
     
   // const documentDefinition = { content: html };
   // pdfMake.createPdf(documentDefinition).open(); 
   const pdfTable = this.pdfTable.nativeElement;
   var html = htmlToPdfmake(pdfTable.innerHTML);
   const documentDefinition = { content: html };
   pdfMake.createPdf(documentDefinition).download(); 
     
  }
  /**END PDF SECTION */
  
  LinkUptime:number=0;
  
  
    
  

  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  
  imageUrl: any = 'assets/images/placeholder.jpg';
  @Input() Obj={dateFrom:"",dateTo:"",sortCode:""}
  resultImage: any;
  
  banks=[];
  aggregatetrans:number=0;
  ReportLabel:string="";
  previousweek:string="";
  displayReport:boolean=false;
  Inflow:any=[];
  Outflow:any=[];
  InflowLastWeek:any=[];
  OutflowLastWeek:any=[];
  BankName="";
  
  //Employee: any = [];
  // Plugin configuration
  config = {
    zoomable: true
  };

  constructor(private bs:BanksService,private es:EfficiencyreportService) {
    this.percentageValue = function (value: number): string {
      return `${Math.round(value)} / ${this['max']}`;
    };
   }
  setValues(){
   
   

  }
  
  ngOnInit(): void {   
  
    this.FetchBanks();
    this.setValues();
  }
  
  FetchBanks(){
    this.bs.FetchBanks().subscribe(d=>{
      //alert(d);
     // console.log("banks:"+d);
      this.banks=d;
    },(error)=>{

    })
  }
  CalculateAggregate(){

  }

  GenerateReport(data:ReportRequest):any{
    this.blackout=true;
   
    this.es.GetReport(data).subscribe((d: any)=>{
      
      console.log(JSON.stringify(d));
      this.displayReport=true;
      this.ReportLabel=d.datetimelabel;
      this.previousweek=d.previousweek;
      this.BankName=d.BankName;
      this.LinkUptime=d.Link;
      this.Inflow=d.Inflow;
      this.Outflow=d.Outflow;
      this.InflowLastWeek=d.InflowLastWeek;
      this.OutflowLastWeek=d.OutflowLastWeek;
      this.ch=d.Link;
      this.data=d.link;
    

      
      this.aggregatetrans=d.TransRating;
      
      this.blackout=false;
    },(error)=>{
      console.log(error);
    })
  }

 /* openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#cropperImageUpload") as HTMLElement;
    element.click()
  }

  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#cropperImageUpload + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
      var fileTypes = ['jpg', 'jpeg', 'png'];  //acceptable file types
      var extension = event.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
      isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
      if (isSuccess) { //yes
        // start file reader
        const reader = new FileReader();
        const angularCropper = this.angularCropper;
        reader.onload = (event) => {
          if(event.target.result) {
            angularCropper.imageUrl = event.target.result;
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      } else { //no
        alert('Selected file is not an image. Please select an image file.')
      }
    }
  }*/

  /*cropImage() {
    this.resultImage = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
    let dwn: HTMLElement = document.querySelector('.download') as HTMLElement;
    dwn.setAttribute('href', this.resultImage);
  }*/

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
