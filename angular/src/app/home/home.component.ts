import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Output ,EventEmitter } from '@angular/core';

import { Emitters } from '../emitters/emitters';
import {Product} from '../interfaces/product';
import { Filter } from '../models/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  authenticated = false;

  message = 'You are not logged in';
  id=''
  email ='';
  products:any =[];
  cart=[];
  filter = {
    s:'' ,sort:'' , page:1
  };
  lastPage=0;
  @Output('setFilters') setFilters = new EventEmitter()
  constructor(private http :HttpClient) { }
  
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean) =>
    {
        this.authenticated=auth;
        
    })

  
    this.load(this.filter);  
    this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe(
      (res:any)=>{
        this.message=`Hello ${res.name} your phone number is ${res.phone} and your email is ${res.email} and your id is ${res.id}`;
        Emitters.authEmitter.emit(true);
        this.email = res.email;
        this.cart = res.cart;
        this.id=res._id;
      },
      err=>{
        this.message='You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    )
        
  }
  addtocart(product:any):void{
    console.log(product);
    this.http.put(`http://localhost:3000/users/addtocart/${this.id}`,{"cart" : [product]}).subscribe();
  }
  
  deletecart():void{
    this.http.delete("http://localhost:3000/users/607f06f59d99800e98c618a1/emptyecart").subscribe();
  }

  load(filter :Filter):void{
    this.filter=filter;
    let params = new HttpParams();
    if(filter.s){
      params= params.set('s',filter.s);
    }
    if(filter.sort){
      params= params.set('sort',filter.sort);
    }

    if(filter.page){
      params= params.set('page',filter.page.toString());
    }
    this.http.get('http://localhost:3000/products',{params}).subscribe(
      (response:any)=>{
                  this.products=filter.page===1 ?response.data :[...this.products , ...response.data] ;
                  this.lastPage = response.last_page;
      })
  }

  search(s:string):void{
      this.setFilters.emit({s})


  }
  setFilter(filters: Filter):void{
this.load(filters);
  }
  
}

