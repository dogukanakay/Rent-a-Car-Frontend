import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { MainComponent } from './components/main/main.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { ToastrModule } from 'ngx-toastr';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add/color-add.component';
import { CarAddComponent } from './components/car/car-add/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update/brand-update.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    RentalComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,
    NaviComponent,
    CarDetailsComponent,
    MainComponent,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCarPipe,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    LoginComponent,
    RegisterComponent,
    
  
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi : true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
