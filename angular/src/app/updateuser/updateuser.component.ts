import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup , ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Identifiers } from '@angular/compiler';
import { SharedService } from './../shared/shared.service';
import { share } from 'rxjs/operators';
@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  formedit : FormGroup;
  name :string; 
  email :string;
  phone:number;
  id:string;
  password:string;
  cart:[]
  userid:string

  constructor(private formbuilder : FormBuilder , private http :HttpClient , private router :Router , private shared:SharedService) {
    
   }

  ngOnInit(): void {
   this.userid =this.shared.getUserId()
    console.log(this.userid)
   this.http.get(`http://localhost:3000/users/${this.userid}`,{withCredentials:true}).subscribe(
    (res:any)=>{
      console.log('id');
      console.log(res.id);
      this.id=res.id;
      this.name = res.name;
    this.email=res.email;
    this.phone=res.phone
    this.password=res.password;
  })

 
 this.formedit = this.formbuilder.group({
  
    name :'',
    email: '',
    password :'',
    phone : '',
    


  });
    
  }
  submit()
  {   
    console.log(this.formedit.getRawValue());
    this.http.patch(`http://localhost:3000/users/${this.id}`,this.formedit.getRawValue()).subscribe(()=>this.router.navigate(['/admin']));

  }

 
  

  


}
