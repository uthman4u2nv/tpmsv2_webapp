import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersurl=environment.usersurl;
  bankusersurl=environment.bankusersurl;
  rolesurl=environment.rolesurl;
  listbankurl=environment.listbankurl;
  updateuserprofileurl=environment.updateuserprofileurl;
  addnewuserurl=environment.addnewuserurl;
  searchuserurl=environment.searchuserurl;
  searchhbankuserurl=environment.searchbankuserurl;
  resetuserurl=environment.resetuserurl;
  updateuserurl=environment.updateProfileurl;
  changepasswordurl=environment.changepasswordurl;
  constructor(public http:HttpClient) { }

  FetchUsers(): Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(this.usersurl,{responseType:'json'});
  }
  FetchBankUsers(d): Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(this.bankusersurl+"/"+d,{responseType:'json'});
  }


  FetchRoles(): Observable<RolesResp[]>{
    return this.http.get<RolesResp[]>(this.rolesurl,{responseType:'json'});
  }
  FetchBanks(): Observable<Bankresponse[]>{
    return this.http.get<Bankresponse[]>(this.listbankurl,{responseType:'json'});
  }

  UpdateUserProfile(data: UpdateUserProfilerequest): Observable<UpdateUserProfileresp>{
    return this.http.post<UpdateUserProfileresp>(this.updateuserprofileurl,data,{responseType:'json'});
  }

  AddNewUser(data: AddNewUserRequest): Observable<AddUserResponse>{
    return this.http.post<AddUserResponse>(this.addnewuserurl,data,{responseType:'json'}); 
  }

  SearchUsers(d): Observable<Bankresponse[]>{
    return this.http.get<Bankresponse[]>(this.searchuserurl+'/'+d,{responseType:'json'});
  }
  SearchBankUsers(d,bankID): Observable<Bankresponse[]>{
    return this.http.get<Bankresponse[]>(this.searchhbankuserurl+'/'+d+'/'+bankID,{responseType:'json'});
  }

  ResetUser(d): Observable<AddUserResponse>{
    return this.http.get<AddUserResponse>(this.resetuserurl+'/'+d,{responseType:'json'}); 
  }
  UpdateProfile(data: UpdateProfileRequest): Observable<UpdateProfileResponse>{
    return this.http.post<UpdateProfileResponse>(this.updateuserurl,data,{responseType:'json'}); 
  }
  ChangePassword(data: ChangePasswordreq): Observable<UpdateUserProfileresp>{
    return this.http.post<UpdateUserProfileresp>(this.changepasswordurl,data,{responseType:'json'}); 
  }

}

export interface Bankresponse{
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

export interface RolesResp{
  roleID:number,
  roleName:string
}

export interface UserResponse{
  userID:number,
  fullnames:string,
  email:string,
  phone:string,
  bank:number,
  bankName:string,
  bankLogo:string,
  role:number,
  roleName:string
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

export interface UpdateUserProfileresp{
  responseCode:string;
  responseMessage:string;
}

export interface AddNewUserRequest{
  fullnames:string;
	email:string;
	phone:string;
	bank:number;
	role:number;
}
export interface AddUserResponse{
  responseCode:string;
  responseMessage:string;
}
export interface UpdateProfileRequest{
  fullnames:string;
  email:string;
  phone:string;
  userID:number;
}
export interface UpdateProfileResponse{
  responseCode:string;
  responseMessage:string;
}
export interface ChangePasswordreq{
  oldpassword:string;
  newpassword:string;
}
