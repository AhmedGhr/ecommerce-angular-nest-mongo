import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { Filter } from '../models/filter';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {
  cart=[];
  id:string;
  allproducts:Product[] = []
  productsIds:string[]=[];
  productsNumber:number=0;
  @Input('filter') filter :Filter;
  @Input('products') products : Product[] = [];
  @Input('lastPage') lastPage: number;
  @Output('setFilters') setFilters = new EventEmitter();
  constructor(private http :HttpClient ,private shared : SharedService , private router :Router) { }

  ngOnInit(): void {

    this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe(
      (res:any)=>{
        
        
        this.cart = res.cart;
        this.id=res._id;
      },
     
    );
    this.http.get("http://localhost:3000/products").subscribe(
      (res :any)=>{
        
        for(let i=0 ;i<res.data.length;i++){
          if(res.data[i].contributor == this.id){
            console.log("if worked!")
            this.productsIds.push(res.data[i]._id)
            
            this.allproducts.push(res.data[i])

            this.productsNumber+=1
          }else{}
        }
     
        console.log("products numbner:"+this.productsNumber)
       
        console.log(res.data.length)
        console.log("id:"+this.id)
        console.log(res.data[0].contributor)
       
    
      })

      this.http.get("http://localhost:3000/products?page=2").subscribe(
      (res :any)=>{
        
        for(let i=0 ;i<res.data.length;i++){
          if(res.data[i].contributor == this.id){
            console.log("if worked!")
            this.productsIds.push(res.data[i]._id)
            
            this.allproducts.push(res.data[i])

            this.productsNumber+=1
          }else{}
        }
     
      
       
    
      })
      this.shared.setMyProductsNumber(5);
      console.log(this.allproducts)
     
  }
  

  delete(id:string):void{
    console.log(id)
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe(

      ()=>this.router.navigate(['/myproducts'])
    );
    alert("User deleted successfully")
    this.allproducts=[]
    this.http.get("http://localhost:3000/products").subscribe(
      
      (res :any)=>{
        
        for(let i=0 ;i<res.data.length;i++){
          if(res.data[i].contributor == this.id){
            console.log("if worked!")
            this.productsIds.push(res.data[i]._id)
            this.allproducts.push(res.data[i])
            this.productsNumber+=1
          }else{}
        }
        console.log(res.data.length)
        console.log("id:"+this.id)
        console.log(res.data[0].contributor)
       
    
      })
    
  


  }

  setProductId(id:string){
    this.shared.setProductId(id);
  }
 
}
