import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode,SelectionType } from '@swimlane/ngx-datatable';
import { ColorcodeService } from '../../../../services/colorcode.service'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mdi',
  templateUrl: './mdi.component.html',
  styleUrls: ['./mdi.component.scss']
})
export class MdiComponent implements OnInit {
  @Input() Obj={displayID:0,statusName:"",startingValue:0,endValue:0,colour:"",status:1}
  @Input() Obj2={statusName:"",startingValue:0,endValue:0,colour:"#ffffff",status:1}
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  selected: any[] = [];
  SelectionType = SelectionType;
  errorCode:string;
  errorCodeName:string;
  bankLogo:string;
  updateInfo:boolean=false;
  addResp:boolean=false;
  updateMsg:string;
  updateAddMsg:string;
  loading:boolean=false;
  loading1:boolean=true;
  loadingAdd:boolean=false;
  BankLoadingMessage:string;
  imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;
    imagePath:any;
    statusName:string;
    colour:string;

    

  

  constructor(public ccs:ColorcodeService,private modalService: NgbModal,private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.FetchColours();
  }

  FetchColours():any{
    this.ccs.FetchColors().subscribe(d=>{
      console.log("Response:"+d);
     this.rows=d;
    },(err: HttpErrorResponse) => {
      this.loading1=true;
      console.log ("Error Logged:"+err.message);
    })
    this.loading1=false;
  }

  onSelect(event,content) {
    // console.log('Event: select', event, this.selected);
    this.updateMsg="";
    this.loading=false;
    this.statusName=this.selected[0].statusName;
    this.colour=this.selected[0].colour;
   
    this.Obj={displayID:this.selected[0].displayID,statusName:this.selected[0].statusName,startingValue:this.selected[0].startingValue,endValue:this.selected[0].endValue,colour:this.selected[0].colour,status:this.selected[0].status}
    this.openBasicModal(content);
   }
 
   openBasicModal(content) {
     this.updateInfo=false;
     this.modalService.open(content, {size: 'lg'}).result.then((result) => {
       //this.basicModalCloseResult = "Modal closed" + result
       this.FetchColours();
     }).catch((res) => {});
   }

   opnAddNewColorCodeModal(content){
     this.Obj2.colour="#ffffff"
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      
      
    }).catch((res) => {});
  }

   UpdateColourCode(data:UpdateColourRequest):any{
    console.log(data);
    this.loading=true;
    
    this.ccs.UpdateColourCode(data).subscribe(d=>{
     if(d.responseCode=="00"){
       this.updateInfo=true;
       this.updateMsg=d.responseMessage;
       this.FetchColours();
       console.log(d.responseMessage)
     }
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading=false;
  }

  AddColourCode(data:AddColourCode):any{
    console.log(data);
    this.loading=true;
    
    this.ccs.AddColourCode(data).subscribe(d=>{
     if(d.responseCode=="00"){
       this.addResp=true;
       this.updateAddMsg=d.responseMessage;
       this.FetchColours();
      // console.log(d.responseMessage);
       this.Obj2={statusName:"",startingValue:0,endValue:0,colour:"#ffffff",status:1}
     }
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading=false;
  }
  

}

export interface UpdateColourRequest{
  statusName:string;
	startingValue:number;
	endValue:number;
	colour:string;
	displayID:number;
  status:number;
}

export interface AddColourCode{
  statusName:string;
	startingValue:number;
	endValue:number;
	colour:string;
  status:number;
}