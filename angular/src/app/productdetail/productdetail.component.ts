import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../../../nest-mongo-ecommerce/src/products/products.model';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
  styles: [`
  .star {
    font-size: 1.5rem;
    color: #b0c4de;
  }
  .filled {
    color: #1e90ff;
  }
  .bad {
    color: #deb0b0;
  }
  .filled.bad {
    color: #ff1e1e;
  }
`]
})
export class ProductdetailComponent implements OnInit {
   product : Product;
   cart=[];
   id=''
   currentRate = 6;
   selected = 0;
   hovered = 0;
   readonly = false;
   form : FormGroup;

   
  constructor(private shared:SharedService ,private http :HttpClient , private formbuilder : FormBuilder) { }


  submit(){
   
    
      console.log("hello");
    }
     
  
  

  
  ngOnInit(): void {

    this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe(
      (res:any)=>{
        
        
        this.cart = res.cart;
        this.id=res._id;
      },
     
    );
       let button = document.getElementById('product');
       button?.click();
       this.product=this.shared.getProduct();
       console.log(this.shared.getProduct());

    
  }


  addtocart(product:any):void{
    console.log(product);
    this.http.put(`http://localhost:3000/users/addtocart/${this.id}`,{"cart" : [product]}).subscribe();
  }

  trade(product:any):void{
    
  }

  getproduct(){
    this.product=this.shared.getProduct();
       console.log(this.shared.getProduct());
    
   
  }

}
