import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { Home1Component } from './home1/home1.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateuserComponent} from './updateuser/updateuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { AdminpaiementsComponent } from './adminpaiements/adminpaiements.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { UpdateproductuserComponent } from './updateproductuser/updateproductuser.component';
import { TradepageComponent } from './tradepage/tradepage.component';


const routes: Routes = [
  {path : '', component:HomeComponent},
  {path : 'productdetail', component:ProductdetailComponent},
  {path: 'home1' ,component:Home1Component},
  {path : 'login', component:LoginComponent},
  {path : 'register', component:RegisterComponent},
  {path : 'product' ,component:ProductComponent} ,
  {path : 'cart' ,component:CartComponent} ,
  {path : 'productdetail' ,component:ProductdetailComponent} ,
  {path : 'profile' ,component:ProfileComponent},
  {path : 'admin' ,component:AdminComponent},
  {path : 'admin/updateproduct' ,component:UpdateproductComponent},
  {path : 'adminproduct' ,component:AdminproductsComponent},
  {path : 'admin/updateuser' ,component:UpdateuserComponent},
  {path : 'admin/paiements' ,component:AdminpaiementsComponent},
  {path : 'admin/adduser' ,component:AdduserComponent},
  {path : 'myproducts' ,component:MyproductsComponent},
  {path : 'updateproducts' ,component:UpdateproductuserComponent},
  {path : 'trade' ,component:TradepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
