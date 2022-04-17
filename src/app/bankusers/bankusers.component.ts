import { Component, OnInit,Input } from '@angular/core';
import { ColumnMode,SelectionType } from '@swimlane/ngx-datatable';
import { UserService } from './../services/user.service';
import { BanksService } from './../services/banks.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { DataTable } from "simple-datatables";


@Component({
  selector: 'app-bankusers',
  templateUrl: './bankusers.component.html',
  styleUrls: ['./bankusers.component.scss']
})
export class BankusersComponent implements OnInit {
  @Input() Obj={userID:0,fullnames:"",email:"",phone:"",bankLogo:"",role:0,bank:parseInt(localStorage.getItem("bank")),status:0}
  @Input() Obj2={fullnames:"",email:"",phone:"",bankLogo:"",role:0,bank:parseInt(localStorage.getItem("bank")),status:0}
  bankID=parseInt(localStorage.getItem("bank"))
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

  constructor(public us:UserService,public bs:BanksService,private modalService: NgbModal,private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loading1=true;
    this.FetchUsers();
    this.FetchRoles();
    this.FetchBanks();
  }

  FetchUsers():any{
    this.us.FetchBankUsers(this.bankID).subscribe(d=>{
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

  SearchUsers(event):any{
    this.BankLoadingMessage="";
    if(event.target.value===""){
      this.FetchUsers();
    return;
    }
    this.us.SearchBankUsers(event.target.value,this.bankID).subscribe(d=>{
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

