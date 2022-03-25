import { Component, OnInit,Input } from '@angular/core';
import { ColumnMode,SelectionType } from '@swimlane/ngx-datatable';
import { SwitcherrorsService } from '../../../../services/switcherrors.service'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {
  @Input() Obj={errorCode:"",errorCodeName:"",errorCodeDesc:"",errorCodeType:1,errorCodeStatus:0,errorCodeID:0}
  @Input() Obj2={errorCode:"",errorCodeName:"",errorCodeDesc:"",errorCodeType:0}
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  selected: any[] = [];
  SelectionType = SelectionType;
  errorCode:string="";
  errorCodeName:string="";
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



  constructor(public sws:SwitcherrorsService,private modalService: NgbModal,private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loading1=true;
    this.FetchErrors()
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    //req.open('GET', `assets/data/100k.json`);
    req.open('GET', this.FetchErrors());

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
  FetchErrors():any{
    this.sws.FetchErrors().subscribe(d=>{
      console.log(d);
     this.rows=d;
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading1=false;
  }

  onSelect(event,content) {
   // console.log('Event: select', event, this.selected);
    this.updateMsg="";
    this.loading=false;
    
    this.errorCodeName=this.selected[0].errorCodeName;
    this.errorCode=this.selected[0].errorCode;
    this.imagePath=this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
    + this.selected[0].bankLogo);
    this.Obj={errorCode:this.selected[0].errorCode,errorCodeName:this.selected[0].errorCodeName,errorCodeDesc:this.selected[0].errorCodeDesc,errorCodeType:this.selected[0].errorCodeType,errorCodeStatus:this.selected[0].errorCodeStatus,errorCodeID:this.selected[0].errorCodeID}
    this.openBasicModal(content);
   }
 
   openBasicModal(content) {
     this.updateInfo=false;
     this.modalService.open(content, {size: 'lg'}).result.then((result) => {
       //this.basicModalCloseResult = "Modal closed" + result
       this.FetchErrors();
     }).catch((res) => {});
   }

   UpdateErrorCode(data:updateRequest):any{
    console.log(data);
    this.loading=true;
    
    this.sws.UpdateError(data).subscribe(d=>{
     if(d.responseCode=="00"){
       this.updateInfo=true;
       this.updateMsg=d.responseMessage;
       this.FetchErrors();
       console.log(d.responseMessage)
     }
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading=false;
  }
  //add new error
  AddError(data:AddErrorCodeRequest):any{
    console.log(data);
    this.loadingAdd=true;
    
    this.sws.CreateError(data).subscribe(d=>{
     if(d.responseCode=="00"){
       this.addResp=true;
       this.updateAddMsg=d.responseMessage+":"+this.Obj2.errorCode+" created successfully";
       this.FetchErrors();
       console.log(d.responseMessage)
       this.Obj2={errorCode:"",errorCodeName:"",errorCodeDesc:"",errorCodeType:0}
     }
    },(err: HttpErrorResponse) => {
      console.log (err.message);
      this.addResp=true;
       this.updateAddMsg=err.message;
    })
    this.loadingAdd=false;
  }

  opnAddNewErrorModal(content){
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      //this.basicModalCloseResult = "Modal closed" + result
      
    }).catch((res) => {});
  }

  SearchErrors(event):any{
    this.BankLoadingMessage="";
    if(event.target.value===""){
      this.FetchErrors();
    return;
    }
    this.sws.SearchError(event.target.value).subscribe(d=>{
      console.log(d);
     this.rows=d;
    },(err: HttpErrorResponse) => {
      this.BankLoadingMessage=err.message;
      console.log (err.message);
    })
  }

}

export interface updateRequest{
  errorCode:string;
  errorCodeName:string;
  errorCodeDesc:string;
  errorCodeType:number;
  errorCodeStatus:number;
  errorCodeID:number;
}

export interface AddErrorCodeRequest{
  errorCode:string;
  errorCodeName:string;
  errorCodeDesc:string;
  errorCodeType:number;
}
