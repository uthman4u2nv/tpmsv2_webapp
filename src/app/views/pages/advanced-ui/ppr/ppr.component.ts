import { Component, Input, OnInit } from '@angular/core';
import { PprserviceService } from 'src/app/services/pprservice.service';
import { reportreq } from 'src/app/services/ppr_model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-ppr',
  templateUrl: './ppr.component.html',
  styleUrls: ['./ppr.component.scss']
})
export class PprComponent implements OnInit {
  /**PDF SECTION */
  title = 'htmltopdf';
  data:0;

  @Input() Obj={date:"",bankName:""}
  displayresult:boolean=false;
  banks:any=[];
  report:any=[];
  bankName:string="";
  date:string="";

  TotalVolumeInwards: number=0;
    TotalValueInwards: number=0;
    TotalVolumeOutwards: number=0;
    TotalValueOutwards: number=0;
    TotalVolumeFailed: number=0;
    TotalValueFailed: number=0;

  constructor(private pps:PprserviceService) { }

  ngOnInit(): void {
    this.ReturnBanks();
  }

  ReturnBanks(){
    this.pps.ReturnBanks().subscribe(d=>{
      
      this.banks=d;
    },error=>{
      console.log(error.message);
    })
  }
  public convertToPDF() {
    var data = document.getElementById('mypdf');
    html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 230;
        var pageHeight = 315;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('l', 'mm', 'a2'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save(this.bankName+'.pdf'); // Generated PDF
    });
}
  

  GenerateReport(data: reportreq){
    this.displayresult=false;
    
    this.pps.GenerateReport(data).subscribe(d=>{
      this.displayresult=true;
      this.report=d.data;
      this.bankName=this.Obj.bankName;
      this.date=this.Obj.date;
      this.TotalVolumeInwards=d.TotalVolumeInwards;
      this.TotalValueInwards=d.TotalValueInwards;
      this.TotalVolumeOutwards=d.TotalVolumeOutwards;
      this.TotalValueOutwards=d.TotalValueOutwards;
      this.TotalVolumeFailed=d.TotalVolumeFailed;
      this.TotalValueFailed=d.TotalValueFailed;
      this.convertToPDF();
      
    },error=>{
      console.log(error.message);
    })
  }

}
