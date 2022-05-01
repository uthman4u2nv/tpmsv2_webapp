import { Component, OnInit,Input } from '@angular/core';
import { ColumnMode,SelectionType } from '@swimlane/ngx-datatable';
import { BanksService } from '../../../../services/banks.service'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-ngx-datatable',
  templateUrl: './ngx-datatable.component.html',
  styleUrls: ['./ngx-datatable.component.scss']
})
export class NgxDatatableComponent implements OnInit {
  @Input() Obj={bankName:"",bankCode:"",bankEmail:"",bankPhone:"",failureThreshold:0,volumeThreshold:0,bankType:0,bankID:0,bankStatus:0,bankLogo:""}
  @Input() Obj2={bankName:"",bankCode:"",bankEmail:"",bankPhone:"",bankLogo:"",failureThreshold:0,volumeThreshold:0,bankType:1,CreatedBy:1}
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  selected: any[] = [];
  SelectionType = SelectionType;
  bankName:string;
  bankLogo:string;
  updateInfo:boolean=false;
  addResp:boolean=false;
  updateMsg:string;
  updateAddMsg:string;
  loading:boolean=false;
  loadingAdd:boolean=false;
  BankLoadingMessage:string;
  imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;
    imagePath:any;
    addRespFailed:boolean=false;
    updateAddMsgFailed="";



  constructor(public bs:BanksService,private modalService: NgbModal,private _sanitizer: DomSanitizer) {
    this.fetch(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  ngOnInit(): void {
    this.FetchBanks();
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    //req.open('GET', `assets/data/100k.json`);
    req.open('GET', this.FetchBanks());

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  FetchBanks():any{
    this.bs.FetchBanks().subscribe(d=>{
     this.rows=d;
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
  }

  CheckCode(event):any{
    this.updateInfo=false;
    this.updateMsg="";
    if(event.target.value===""){
      this.FetchBanks();
    return;
    }
    this.bs.CheckCode(event.target.value).subscribe(d=>{
      console.log(d);
     if(d.count>0){
      this.updateInfo=true;
      this.updateMsg="A bank with code "+event.target.value+" already exists";
      this.Obj.bankCode="";
      this.Obj2.bankCode="";
     }else{
      this.updateInfo=false;
      this.updateMsg="";
     }
    },(err: HttpErrorResponse) => {
      this.BankLoadingMessage=err.message;
      console.log (err.message);
    })
  }


  //search banks
  SearchBanks(event):any{
    this.BankLoadingMessage="";
    if(event.target.value===""){
      this.FetchBanks();
    return;
    }
    this.bs.SearchBank(event.target.value).subscribe(d=>{
      console.log(d);
     this.rows=d;
    },(err: HttpErrorResponse) => {
      this.BankLoadingMessage=err.message;
      console.log (err.message);
    })
  }

  UpdateBanks(data:UpdateBankRequest):any{
    console.log(data);
    this.loading=true;
    
    this.bs.UpdateBank(data).subscribe(d=>{
     if(d.responseCode=="00"){
       this.updateInfo=true;
       this.updateMsg=d.responseMessage;
       this.FetchBanks();
       console.log(d.responseMessage)
     }
    },(err: HttpErrorResponse) => {
      console.log (err.message);
    })
    this.loading=false;
  }


  AddBank(data:AddBankReq):any{
    this.addResp=false;
    this.addRespFailed=false;
    this.updateAddMsgFailed="";
    this.updateAddMsg="";
    console.log(data);
    this.loadingAdd=true;
    
    this.bs.CreateBank(data).subscribe(d=>{
     if(d.responseCode=="00"){
       this.addResp=true;
       this.updateAddMsg=d.responseMessage+":"+this.Obj2.bankName+" created successfully";
       this.FetchBanks();
       console.log(d.responseMessage)
       this.Obj2={bankName:"",bankCode:"",bankEmail:"",bankPhone:"",bankLogo:"Logo2.png",failureThreshold:0,volumeThreshold:0,bankType:1,CreatedBy:1}
     }else{
      this.addRespFailed=true;
      this.updateAddMsgFailed=d.responseMessage;
     }
    },(err: HttpErrorResponse) => {
      console.log (err.message);
      this.addResp=true;
       this.updateAddMsg=err.message;
    })
    this.loadingAdd=false;
  }

  onSelect(event,content) {
   // console.log('Event: select', event, this.selected);
   this.updateMsg="";
   this.loading=false;
   
   this.bankName=this.selected[0].bankName;
   this.bankLogo=this.selected[0].bankLogo;
   this.imagePath=this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
   + this.selected[0].bankLogo);
   this.Obj={bankName:this.selected[0].bankName,bankCode:this.selected[0].bankCode,bankEmail:this.selected[0].bankEmail,bankPhone:this.selected[0].bankPhone,failureThreshold:this.selected[0].failureThreshold,volumeThreshold:this.selected[0].volumeThreshold,bankType:this.selected[0].bankType,bankID:this.selected[0].bankID,bankStatus:this.selected[0].bankStatus,bankLogo:this.selected[0].bankLogo}
   this.openBasicModal(content);
  }

  openBasicModal(content) {
    this.updateInfo=false;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      //this.basicModalCloseResult = "Modal closed" + result
      this.FetchBanks();
    }).catch((res) => {});
  }

  opnAddNewBankModal(content){
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      //this.basicModalCloseResult = "Modal closed" + result
      this.FetchBanks();
    }).catch((res) => {});
  }


  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        /*if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }*/
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.Obj.bankLogo=imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

  


}

export interface UpdateBankRequest{
  bankID:number;
  bankName:string;
  bankCode:string;
bankEmail:string;	
bankPhone:string;
  bankLogo:string;
failureThreshold:number;
  volumeThreshold:number;
bankType:number;
  bankStatus:number;
}

export interface AddBankReq{
  bankName:string;
	bankCode:string;
	bankEmail:string;
	bankPhone:string;
	bankLogo:string;
	failureThreshold:number;
	volumeThreshold:number;
	bankType:number;
	CreatedBy:number;
}

