import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AdvancedUiComponent } from './advanced-ui.component';
import { ImageCropperComponent } from './image-cropper/cropper.component';
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import { SweetAlertComponent } from './sweet-alert/sweet-alert.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgbActiveModal, NgbModal, NgbNav, NgbNavConfig,NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import {GuagechartComponent} from './../../../guagechart/guagechart.component'
//import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//import { Socket } from 'ngx-socket-io';  
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgxGaugeModule } from 'ngx-gauge';

/*const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {
		transports: ['websocket']
	}
}*/




const routes: Routes = [
  {
    path: '',
    component: AdvancedUiComponent,
    children: [
      {
        path: '',
        redirectTo: 'cropper',
        pathMatch: 'full'
      },
      {
        path: 'report',
        component: ImageCropperComponent
      },
      {
        path: 'owl-carousel',
        component: OwlCarouselComponent
      },
      {
       // path: 'sweet-alert',
        path: 'dashboard-new',
        component: SweetAlertComponent
      }
    ]
  }
]



@NgModule({
  declarations: [AdvancedUiComponent, ImageCropperComponent, OwlCarouselComponent, SweetAlertComponent,GuagechartComponent],
  exports: [GuagechartComponent],
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularCropperjsModule,
    CarouselModule,
    SweetAlert2Module.forRoot(),
    NgxDatatableModule,
    NgbNavModule,
    NgApexchartsModule,
    ChartsModule,
    FormsModule,
    NgxGaugeModule,
    GoogleChartsModule.forRoot(),
    //SocketIoModule.forRoot(config),


  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
  
})
export class AdvancedUiModule { }