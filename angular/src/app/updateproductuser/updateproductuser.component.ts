import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-updateproductuser',
  templateUrl: './updateproductuser.component.html',
  styleUrls: ['./updateproductuser.component.css']
})
export class UpdateproductuserComponent implements OnInit {
  form : FormGroup;
  productId:string
  idProduit:string
  image:string;
  title:string;
  price:string;
  description:string;
  type:string
  constructor(private shared:SharedService , private http:HttpClient , private router:Router ,private formbuilder : FormBuilder) { }

  ngOnInit(): void {
    this.productId=this.shared.getProductId();
    console.log(this.productId)
    this.http.get(`http://localhost:3000/products/${this.productId}`,{withCredentials:true}).subscribe(
      (res:any)=>{console.log(res);
        this.title=res.title
        this.description=res.description
        this.image=res.image;
        this.price=res.price;
        this.type=res.type;
        })
   
   
        this.form = this.formbuilder.group({
  
          title :'',
          type: '',
          description :'',
          price : '',
          image : ''
          
      
      
        });
          
        }
    
  
submit(id:string){
  console.log(id)
  console.log(this.productId)
  console.log(this.form.getRawValue());
    this.http.patch(`http://localhost:3000/products/${id}`,this.form.getRawValue()).subscribe(()=>this.router.navigate(['/myproducts']));

}

}
