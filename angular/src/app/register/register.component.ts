import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {Product} from '../../../../nest-mongo-ecommerce/src/products/products.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   form : FormGroup;
   
 

  constructor(private formbuilder : FormBuilder , private http :HttpClient , private router :Router) {
    
   }

  ngOnInit(): void {
    
   this.form = this.formbuilder.group({

      name :'',
      email :'',
      password :'',
      phone : ''


    });
  }
  submit()
  {
    console.log(this.form.getRawValue());
    this.http.post('http://localhost:3000/users/add',this.form.getRawValue()).subscribe(()=>this.router.navigate(['/login']));

  }
}
