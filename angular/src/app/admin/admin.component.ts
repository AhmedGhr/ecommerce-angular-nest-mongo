import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import{User} from '../models/users';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 users = [];
 
   constructor(private http: HttpClient ,private shared:SharedService) {}

  ngOnInit(): void {
    this.getallusers();
  
  }

  delete(id:string):void{
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe();
    alert("User deleted successfully")
    this.getallusers()

  }

  getallusers():void{
    this.http.get("http://localhost:3000/users",{withCredentials:true}).subscribe(
      (res :any)=>{
        
        this.users= res;
        console.log(this.users)
      }
    )
  }
  
  setId(id:string){
    this.shared.setUserId(id);

  }

}
