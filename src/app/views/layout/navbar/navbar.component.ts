import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  email="";
  fullnames="";
  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email=localStorage.getItem('email').toString();
    this.fullnames=localStorage.getItem("fullnames").toString();
  }

  SignOut(){
    localStorage.clear();
    this.router.navigate['/auth/login'];
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }



}
