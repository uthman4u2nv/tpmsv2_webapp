import { Component, OnInit,Input } from '@angular/core';
import { ColumnMode,SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from '../../../../services/user.service';
import { BanksService } from '../../../../services/banks.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';


import { DataTable } from "simple-datatables";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() Obj={userID:0,fullnames:"",email:"",phone:"",bankLogo:"",role:0,bank:0,status:0}
  @Input() Obj2={fullnames:"",email:"",phone:"",bankLogo:"",role:0,bank:0,status:0}
  @Input() Obj3={email:""}
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
    roles=[];
    banks=[];
    addRespFailed:boolean=false;
    updateAddMsgFailed="";

  constructor(public us:UserService,public bs:BanksService,private modalService: NgbModal,private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //const dataTable = new DataTable("#dataTableExample");
    this.loading1=true;
    this.FetchUsers();
    this.FetchRoles();
    this.FetchBanks();
  }
  
  FetchUsers():any{
    this.us.FetchUsers().subscribe(d=>{
      console.log(d);
     this.rows=d;
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading1=false;
  }
  FetchRoles():any{
    this.us.FetchRoles().subscribe(d=>{
      
     this.roles=d;
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading1=false;
  }
  FetchBanks():any{
    this.us.FetchBanks().subscribe(d=>{     
      console.log("Banks:"+d) 
     this.banks=d;
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
    this.Obj={userID:this.selected[0].userID,fullnames:this.selected[0].fullnames,email:this.selected[0].email,phone:this.selected[0].phone,bankLogo:this.selected[0].bankLogo,role:this.selected[0].role,bank:this.selected[0].bank,status:this.selected[0].status}
    
    this.openBasicModal(content);
   }
 
   openBasicModal(content) {
     this.updateInfo=false;
     this.modalService.open(content, {size: 'lg'}).result.then((result) => {
       //this.basicModalCloseResult = "Modal closed" + result
       this.FetchUsers();
     }).catch((res) => {});
   }

   opnAddNewErrorModal(content){
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      //this.basicModalCloseResult = "Modal closed" + result
      
    }).catch((res) => {});
  }

   UpdateUserProfile(data:UpdateUserProfilerequest):any{
    console.log(data);
    this.loading=true;
    
    this.us.UpdateUserProfile(data).subscribe(d=>{
     if(d.responseCode=="00"){
       this.updateInfo=true;
       this.updateMsg=d.responseMessage;
       this.FetchUsers();
       this.FetchRoles();
       this.FetchBanks();
       console.log(d.responseMessage)
     }
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading=false;
  }

  AddNewUser(data:AddNewUserRequest):any{
    this.loading=true;
    
    this.us.AddNewUser(data).subscribe(d=>{
     if(d.responseCode=="00"){
       this.addResp=true;
       this.updateAddMsg=d.responseMessage;
       this.FetchUsers();
       this.FetchRoles();
       this.FetchBanks();
       console.log(d.responseMessage)
     }
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading=false;
  }

  CheckEmail(event){
    this.addResp=false;
    this.addRespFailed=false;
    
    this.Obj3.email=event.target.value;
    this.us.CheckEmail(this.Obj3).subscribe(d=>{
      
      if(d.responseCode=="99"){
        this.addRespFailed=true;
        this.updateAddMsgFailed=d.responseMessage;
        
        this.Obj2.email="";
      }
    },(error)=>{
      this.addRespFailed=true;
        this.updateAddMsgFailed=error.message;
    })
  }

  SearchUsers(event):any{
    this.BankLoadingMessage="";
    if(event.target.value===""){
      this.FetchUsers();
    return;
    }
    this.us.SearchUsers(event.target.value).subscribe(d=>{
      console.log(d);
     this.rows=d;
    },(err: HttpErrorResponse) => {
      this.BankLoadingMessage=err.message;
      console.log (err.message);
    })
  }
  ResetUsers(event):any{
    this.BankLoadingMessage="";
    
    this.us.ResetUser(event).subscribe(d=>{
      console.log(d);
     if(d.responseCode=="00"){
      this.updateInfo=true;
       this.updateMsg=d.responseMessage;
     }else{
      this.updateInfo=true;
       this.updateMsg=d.responseMessage;
     }
    },(err: HttpErrorResponse) => {
      this.BankLoadingMessage=err.message;
      console.log (err.message);
    })
  }





}
export interface CheckEmailRequest{
  email:string;
}
export interface UpdateUserProfilerequest{
  fullnames:string;
	email:string;
	phone:string;
	bank:number;
	role:number;
	status:number;
	userID:number;
}

export interface AddNewUserRequest{
  fullnames:string;
	email:string;
	phone:string;
	bank:number;
	role:number;
}
