import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {Product} from '../../../../nest-mongo-ecommerce/src/products/products.model'
import { Identifiers } from '@angular/compiler';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form : FormGroup;
  name :string; 
  email :string;
  phone:number;
  id:string;

  constructor(private formbuilder : FormBuilder , private http :HttpClient , private router :Router) {
    
   }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe(
      (res:any)=>{
        console.log('id');
        console.log(res._id);
        this.id=res._id;
        this.name = res.name;
      this.email=res.email;
      this.phone=res.phone})
   this.form = this.formbuilder.group({
    
      name :'',
      email :'',
      password :'',
      phone : ''


    });
  }
  submit()
  { let id ;
    let user :string[];
   

      
    console.log(this.form.getRawValue());
    this.http.patch(`http://localhost:3000/users/${this.id}`,this.form.getRawValue()).subscribe(()=>this.router.navigate(['/profile']));

  }

}
