import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColumnMode,SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from '../../../../services/auth.service'
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  @Input() Obj={email:"",password:""}
  validation:boolean=false;
  validationResp="";
  btnLink="Login";
  blackout:boolean=false;
  

  constructor(private router: Router, private route: ActivatedRoute,private AuthServe:AuthService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  DoLogin(data:LoginRequest){
    this.blackout=true;
    this.validation=false;
        this.validationResp="";
        this.btnLink="Login .....";
    this.AuthServe.Login(data).subscribe(d=>{
      if(d.responseCode=="00"){
        this.blackout=false;
        localStorage.setItem("fullnames",d.fullnames);
        localStorage.setItem("email",d.email);
        localStorage.setItem("phone",d.phone);
        localStorage.setItem("bank",d.bank.toString());
        localStorage.setItem("role",d.role.toString());
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem("dateJoined",d.dateJoined);
        localStorage.setItem("bankName",d.bankName);
        localStorage.setItem("roleName",d.roleName);
        localStorage.setItem("userID",d.userID.toString());
        //alert("Role:"+d.role);
        if(d.status==1){
        this.router.navigate(['dashboard-new/dashboard-new']);
        }else if(d.status==2){
          this.router.navigate(['general/profile']);
        }
        
        this.btnLink="Login";
      }else{
        this.validation=true;
        this.validationResp=d.responseMessage;
        this.blackout=false;
        //this.btnLink="Login";
      }
    })
  }
  onLoggedin(e) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
  }

}

export interface LoginRequest{
  email:string;
  password:string;
}
