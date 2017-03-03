import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { DatepickerModule } from 'angular2-material-datepicker';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddorderComponent } from './components/addorder/addorder.component';
import { HeaderComponent } from './components/header/header.component';
import { ManagersService } from './services/managers.service';
import { OrdersService } from './services/orders.service';
import { ProvidersService } from './services/providers.service';
import { FilterByPipe } from './pipes/filterBy.pipe';
import { SortArrPipe } from './pipes/sortArr.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { appRoutes } from './routes'


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OrdersComponent,
    AddorderComponent,
    HeaderComponent,
    FilterByPipe,
    SortArrPipe,
    PaginationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    DatepickerModule
  ],
  providers: [ManagersService, OrdersService, ProvidersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
