import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StuffinglistComponent } from './stuffinglist/stuffinglist.component';
import { AddStuffingComponent } from './add-stuffing/add-stuffing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPortsComponent } from './add-ports/add-ports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationComponent } from './quotation/quotation.component';
import { MatStepperModule } 
    from '@angular/material/stepper';
import { BrowserAnimationsModule } 
    from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputPromptComponent } from './mat-input-prompt/mat-input-prompt.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    StuffinglistComponent,
    AddStuffingComponent,
    AddPortsComponent,
    DashboardComponent,
    QuotationComponent,
    MatInputPromptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  //IMPORTANT: Add it after BrowserModule only
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,MatSelectModule,MatAutocompleteModule,
    MatDatepickerModule,
               MatNativeDateModule 
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent,QuotationComponent],
})
export class AppModule { }
