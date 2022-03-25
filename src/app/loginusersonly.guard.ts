import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginusersonlyGuard implements CanActivate {

  constructor(private router: Router, private route: ActivatedRoute) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem("isLoggedin") && localStorage.getItem("fullnames") !=""){
      return true;
    }
    window.alert("You must be authorized to access this page");
    this.router.navigate(['auth/login']);
    return false;
  }
  
}
