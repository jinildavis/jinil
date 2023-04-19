import { Component, NgModule } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { AddPortsComponent } from './add-ports/add-ports.component';
import { AddStuffingComponent } from './add-stuffing/add-stuffing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationComponent } from './quotation/quotation.component';

const routes: Routes = [ {path: '',redirectTo: '/dashboard', pathMatch: 'full'},
{ path: 'dashboard', component: DashboardComponent },
  {path: 'add-ports', component: AddPortsComponent},
  {path: 'add-stuffing', component:AddStuffingComponent},
  {path: 'quotation', component:QuotationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
