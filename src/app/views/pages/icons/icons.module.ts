import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

import { IconsComponent } from './icons.component';
import { FeatherComponent } from './feather/feather.component';
import { FlagComponent } from './flag/flag.component';
import { MdiComponent } from './mdi/mdi.component';



import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';


const routes: Routes = [
  {
    path: '',
    component: IconsComponent,
    children: [
      {
        path: '',
        redirectTo: 'feather-icons',
        pathMatch: 'full'
      },
      {
        path: 'feather-icons',
        component: FeatherComponent
      },
      {
        path: 'flag-icons',
        component: FlagComponent
      },
      {
        path: 'mdi-icons',
        component: MdiComponent
      }
    ]
  }
]

@NgModule({
  declarations: [IconsComponent, FeatherComponent, FlagComponent, MdiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    NgxDatatableModule,
    FormsModule,
    ColorPickerModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule
  ]
})
export class IconsModule { }
