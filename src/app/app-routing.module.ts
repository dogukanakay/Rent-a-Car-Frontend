import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { MainComponent } from './components/main/main.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add/color-add.component';
import { CarAddComponent } from './components/car/car-add/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update/brand-update.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:MainComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/color/:colorId/brand/:brandId", component:CarComponent},
  {path:"cars/:carId", component:CarDetailsComponent},
  {path:"cars/:carId/payment", component:PaymentComponent},
  {path:"brand/add", component:BrandAddComponent, canActivate:[loginGuard]},
  {path:"color/add", component:ColorAddComponent, canActivate:[loginGuard]},
  {path:"car/add", component:CarAddComponent, canActivate:[loginGuard]},
  {path:"car/update/:carId", component:CarUpdateComponent},
  {path:"color/update/:colorId/:colorName", component:ColorUpdateComponent},
  {path:"brand/update/:brandId/:brandName", component:BrandUpdateComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
