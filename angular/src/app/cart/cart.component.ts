import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart : any[]
  newcart:any[]=[]
  totalPrice:number =0
  totalPriceSring:string;
  price : number
  id:string
  images:String[];
  cartnumber:number;

  constructor(private  http :HttpClient , private router :Router) { }

  ngOnInit(): void {
    this.getProducts();
    }
    

    getProducts():void{this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe((res:any)=>
    {   this.id = res._id;
        this.price=Number("55")+10
        this.cart = res.cart;
        this.cartnumber=res.cart.length
        for(let i=0; i<res.cart.length; i++){
          console.log(typeof(res.cart[i].price)); //use i instead of 0
         
          console.log(res.cart[i].price)
          
          this.totalPrice=this.totalPrice+res.cart[i].price
          this.price= Number(this.totalPrice.toString())
      }
        console.log(typeof this.totalPrice)
        this.totalPriceSring=this.totalPrice.toString()
        console.log(typeof this.totalPriceSring)

        console.log(this.cart);
    })
  }

  delteItemFromCart(id:string):void{
    console.log(id);
    this.http.delete(`http://localhost:3000/users/${this.id}/${id}/emptycart`).subscribe();
    
  }

  emptycart():void{
    this.getProducts();
    this.http.delete(`http://localhost:3000/users/${this.id}/emptycart`).subscribe();
    
  }

  pay(){
    let date = new Date().toLocaleString();
    this.http.post("http://localhost:3000/paiements/",{"id":Math.random().toString(10).substr(2, 9),"contributor":this.id,"date":date,"price":this.price}).subscribe(()=>
      alert("paiement successful")
    );
  }

 
  
}
