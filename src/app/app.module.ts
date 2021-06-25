import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CustomerDisplayComponent } from './customers/customer-display/customer-display.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { OrderCreateComponent } from './orders/order-create/order-create.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { DataStorageService } from './service/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerCreateComponent,
    CustomerDetailComponent,
    CustomerDisplayComponent,
    CustomerListComponent,
    OrderCreateComponent,
    OrderDetailComponent,
    SelectRequiredValidatorDirective,
    OrderListComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
