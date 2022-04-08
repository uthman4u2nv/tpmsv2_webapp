import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() Obj={fullnames:localStorage.getItem("fullnames"),email:localStorage.getItem("email"),phone:localStorage.getItem("phone")}
  fullnames="";
  email="";
  phone="";
  bankName="";
  roleName="";
  dateJoined="";
  constructor() { }

  ngOnInit(): void {
    this.fullnames=localStorage.getItem("fullnames");
    this.email=localStorage.getItem("email");
    this.phone=localStorage.getItem("phone");
    this.bankName=localStorage.getItem("bankName");
    this.roleName=localStorage.getItem("roleName");
    this.dateJoined=localStorage.getItem("dateJoined");
  }

}
