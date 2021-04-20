import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// MATERIAL
import {MaterialModule} from './material-module';
// COMPONENTS
import { DataEntryFormComponent } from './data-entry-form/data-entry-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreiewModeComponent } from './data-entry-form/preiew-mode/preiew-mode.component';
// service
import { DataEntryService } from './service/data-entry.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DataEntryFormComponent,
    DashboardComponent,
    PreiewModeComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    DataEntryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
