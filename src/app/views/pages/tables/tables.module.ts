import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { DataTableComponent } from './data-table/data-table.component';
import { NgxDatatableComponent } from './ngx-datatable/ngx-datatable.component';
import {GuagechartComponent} from './../../../guagechart/guagechart.component'

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: '',
        //redirectTo: 'basic-table',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'codes',
        component: BasicTableComponent
      },
      {
        //path: 'data-table',
        path: 'users',
        component: DataTableComponent
      },
      {
        //path: 'ngx-datatable',
        path: 'banks',
        component: NgxDatatableComponent
      },
      {
        path: 'guage',
        component: GuagechartComponent
      }
    ]
  }
]

@NgModule({
  declarations: [TablesComponent, BasicTableComponent, DataTableComponent, NgxDatatableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule
  ]
})
export class TablesModule { }
