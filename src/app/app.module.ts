import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { GoogleChartsModule } from 'angular-google-charts';
import { environment } from 'src/environments/environment';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//import { Socket } from 'ngx-socket-io';  
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BankusersComponent } from './bankusers/bankusers.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { GuagechartComponent } from './guagechart/guagechart.component';

/*const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {
		transports: ['websocket']
	}
}*/

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ChangepasswordComponent,
    BankusersComponent,
    //GuagechartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    NgxDatatableModule,
    GoogleChartsModule.forRoot(),
    //SocketIoModule.forRoot(config),
    //SocketIoModule.forRoot({ url: 'http://localhost:8586' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      //registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
