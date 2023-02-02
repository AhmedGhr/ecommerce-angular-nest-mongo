import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false;
  cartlength:number;
  myproductsnumber:number;
  constructor(private http : HttpClient , private shared:SharedService) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean) =>
    {
        this.authenticated=auth;
        
    })
    this.getProducts();
    this.myproductsnumber=this.shared.getMyProductsNumber()
   
    
  }

  logout():void {
      this.http.post('http://localhost:3000/users/logout',{},{withCredentials:true}).subscribe(
                         () => this.authenticated=false);

      
  }
  getProducts():void{this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe((res:any)=>
  { 
      this.cartlength = res.cart.length;
      
      
  })


}}
