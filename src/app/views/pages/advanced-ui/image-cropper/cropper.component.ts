import { Component, OnInit, ViewChild,Input,ElementRef } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';
import { BanksService } from '../../../../services/banks.service';
import { EfficiencyreportService } from '../../../../services/efficiencyreport.service';
import { GoogleChartComponent } from 'angular-google-charts';  
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
declare var google:any;

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

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
  ch=80;
  dd=[];
  @Input() Cha={ch:90,charttitle:"Test"}
  charttitle="";
  @ViewChild('googlechart')googlechart: GoogleChartComponent;
  @ViewChild('googlechart')googlechartlink: GoogleChartComponent;

  /**PDF SECTION */
  title = 'htmltopdf';
  data:0;
  
  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }
  /**END PDF SECTION */
  
  LinkUptime:number=0;
  chart = {
    type: 'Gauge',
    data: [
    [this.charttitle, this.ch]
    ],
    options: {
    width: 400,
    height: 120,
    greenFrom: 0,
    greenTo: 5,
    redFrom: 10,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5
    }
    };
  
    
  chart2 = {
    type: 'Gauge',
    data: [
      ["", this.Cha.ch]
      ],
    options: {
    width: 400,
    height: 120,
    greenFrom: 70,
    greenTo: 100,
    redFrom: 0,
    redTo: 50,
    yellowFrom: 50,
    yellowTo: 700,
    minorTicks: 5
    }
    };
  

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

  constructor(private bs:BanksService,private es:EfficiencyreportService) { }
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
      this.Cha.ch=d.Link;
      this.chart.data=d.Link;

      
      this.aggregatetrans=d.TransRating;
      
      
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
