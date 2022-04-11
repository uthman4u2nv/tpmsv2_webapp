import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() Obj={fullnames:localStorage.getItem("fullnames"),email:localStorage.getItem("email"),phone:localStorage.getItem("phone"),userID:parseInt(localStorage.getItem("userID"))}
  fullnames="";
  email="";
  phone="";
  bankName="";
  roleName="";
  dateJoined="";
  showresult:boolean=false;
  showresultfailed:boolean=false;
  message="";
  messagefailed="";
  constructor(private us:UserService) { }

  ngOnInit(): void {
    this.fullnames=localStorage.getItem("fullnames");
    this.email=localStorage.getItem("email");
    this.phone=localStorage.getItem("phone");
    this.bankName=localStorage.getItem("bankName");
    this.roleName=localStorage.getItem("roleName");
    this.dateJoined=localStorage.getItem("dateJoined");
  }
  
  UpdateProfile(data: UpdateProfileRequest){
    this.showresult=false;
    this.showresultfailed=false;
    this.message="";
    this.messagefailed="";
    this.us.UpdateProfile(data).subscribe(d=>{
      if(d.responseCode=="00"){
        this.showresult=true;
        this.showresultfailed=false;
        this.messagefailed="";
        this.message=d.responseMessage;
        localStorage.setItem("fullnames",this.Obj.fullnames);
        localStorage.setItem("email",this.Obj.email);
        localStorage.setItem("phone",this.Obj.phone);

      }else{
        this.showresult=false;
        this.showresultfailed=true;
        this.messagefailed=d.responseMessage;
        this.message="";
      }
    },(error)=>{
      this.showresult=false;
      this.showresultfailed=true;
      this.messagefailed=error;
      this.message="";
      
    })
  }

}

export interface UpdateProfileRequest{
  fullnames:string;
  email:string;
  phone:string;
  userID:number;
}
