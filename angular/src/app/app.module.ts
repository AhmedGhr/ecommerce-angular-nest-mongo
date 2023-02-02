import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFireModule} from '@angular/fire';
import { Home1Component } from './home1/home1.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { AdminpaiementsComponent } from './adminpaiements/adminpaiements.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { UpdateproductuserComponent } from './updateproductuser/updateproductuser.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TradepageComponent } from './tradepage/tradepage.component'


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    ProductComponent,
    Home1Component,
    SidebarComponent,
    ProfileComponent,
    CartComponent,
    ProductdetailComponent,
    ProductsComponent,
    AdminComponent,
    UpdateuserComponent,
    AdduserComponent,
    AdminproductsComponent,
    UpdateproductComponent,
    AdminpaiementsComponent,
    MyproductsComponent,
    UpdateproductuserComponent,
    TradepageComponent
  ],
  imports: [NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA4GAXDJM_o9chMVrGWuHixbrfTdLnmtAk",
      authDomain: "nest-angular-mongo-firebase.firebaseapp.com",
      projectId: "nest-angular-mongo-firebase",
      storageBucket: "nest-angular-mongo-firebase.appspot.com",
      messagingSenderId: "616675854591",
      appId: "1:616675854591:web:c81e590f3982e40604e4ca",
      measurementId: "G-60QVH3CQH6"
    }),
    AngularFireStorageModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  exports:[ReactiveFormsModule,FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
