import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {AngularFireStorage , } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import {ProfileComponent} from '../profile/profile.component';





@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  file : File;
  form : FormGroup;
  name:string;
  path:string;
  selectedFile :File;
  downloadUrl: Observable<String>;
  random=Math.random();
  url:any;
  fb:String;
  id:string;
  contributor:any;
  email:string;
  imagename:string;
  constructor(private formBuilder : FormBuilder , private http :HttpClient , private router : Router , private af: AngularFireStorage , private storage:AngularFireStorage) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe(
      (res:any)=>{
        this.email =res.email;
        let id = res._id;
       
        this.contributor="dqsdzzzzzz"
        this.id=res._id;
        })
   
    
    
    this.form= this.formBuilder.group({
      title: '',
      type: '',
      description:'',
      image: this.imagename,
      price: '',
      contributor :'',

    })
  }

  submit($event:any):void{
    this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe(
      (res:any)=>{
        let id = res._id;
        
        this.contributor="dqsdzzzzzz"
        this.id=res._id;
        })
   
    console.log(this.id);
    const formData: FormData = new FormData();
    formData.append("image", $event.target.files[0]);
    this.http.post('http://localhost:3000/products/upload',formData).subscribe(
      (res:any)=>{
        this.imagename=res.name;
        
      }
    );
   
    this.http.post('http://localhost:3000/products',this.form.getRawValue()).subscribe(()=>this.router.navigate(['/']));
   
    
   

      



  }
 
}
