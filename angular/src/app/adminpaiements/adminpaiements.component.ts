import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-adminpaiements',
  templateUrl: './adminpaiements.component.html',
  styleUrls: ['./adminpaiements.component.css']
})
export class AdminpaiementsComponent implements OnInit {
  paiementId:string;
  contributor:string;
  price:number;
  paiements:[];
  contributorsIds:string[]=[]
  names:string[]=[]
  length:number;
  constructor(private http : HttpClient ,private shared : SharedService) { }

  ngOnInit(): void {
   this.http.get("http://localhost:3000/paiements",{withCredentials:true}).subscribe(
      (res :any)=>{
        this.paiements=res;
        this.paiementId=res._id;
        for(let i=0 ; i<res.length;i++){this.contributorsIds.push(res[i].contributor)
        console.log(this.contributorsIds.length)
      this.length=this.contributorsIds.length}
        
        this.contributor=res.contributor;
        this.price=res.price;
        console.log(res)
        console.log(res.contributor);
       
        
      }
    )
    
   console.log(this.contributorsIds)
   console.log(this.length)
   for(let i=0 ;i<this.contributorsIds.length;i++){
    this.names.push("hell")}
   console.log(this.names)

  }


  getallPaiements():void{
    
    
    this.http.get("http://localhost:3000/paiements",{withCredentials:true}).subscribe(
      (res :any)=>{
        this.paiements=res;
        this.paiementId=res._id;
        for(let i=0 ; i<res.length;i++){this.contributorsIds.push(res[i].contributor)}
        
        this.contributor=res.contributor;
        this.price=res.price;
        console.log(res)
        console.log(res.contributor);
       
        
      }
    )
    
  }
  getUserById():void{
    
    
  }
  
}
