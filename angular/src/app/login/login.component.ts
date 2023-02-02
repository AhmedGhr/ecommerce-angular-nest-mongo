import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form :FormGroup;

  constructor(private formBuilder :FormBuilder ,private http : HttpClient ,private router : Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email :'',
      password :''

    });
  }

  submit():void{
    console.log(this.form.get('email')?.value);
    console.log(this.form.get('password')?.value);
    if(this.form.get('email')?.value == "admin" && this.form.get('password')?.value== "admin" ){
      this.router.navigate(['/admin'])
    }else{
this.http.post('http://localhost:3000/users/login',this.form.getRawValue() ,{withCredentials:true})
.subscribe(()=>this.router.navigate(['/']));
    
    }
  }

}
