import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../../nest-mongo-ecommerce/src/products/products.model';
import { Filter } from '../models/filter';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminproductsComponent implements OnInit {
  
 contributorsIds:string[]=["607a282e189f7e34748291b9","607a299605d13b392c8a51ae","608f395c9b5162707cac09d9"];
 names:string[]=[];
 totalpages:number;
 pagesarray:number[]=[]
 productsnumber:number;
  @Input('filter') filter :Filter;
  @Input('products') products : Product[] = [];
  @Input('lastPage') lastPage: number;
  @Output('setFilters') setFilters = new EventEmitter();
  constructor(private http : HttpClient ,private shared : SharedService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/products/",{withCredentials:true}).subscribe(
      (res :any)=>{
        for(let i=0;i<res.data.length;i++){
          this.contributorsIds.push(res.data[i].contributor);
        
        }
        this.shared.setcontributorsIds(this.contributorsIds)
        this.products= res.data;
       this.totalpages=res.last_page;
       this.productsnumber=res.total;
        console.log(this.products)
        console.log(this.totalpages)
        for(let i=0;i<this.totalpages;i++){
          this.pagesarray.push(i)
        }
        
      }
    )
    
    console.log(this.contributorsIds)
    for(let i =0 ; i<this.contributorsIds.length;i++){
      console.log(this.contributorsIds[i])
      this.http.get(`http://localhost:3000/users/${this.contributorsIds[i]}`,{withCredentials:true}).subscribe(
        (res:any)=>{
            console.log(res)
            this.names.push(res.name)
  
        }
      )
    }
    console.log(this.shared.getContributorsIds())
    console.log(this.names)
  }
  

  getallproducts():void{
    
    console.log(this.shared.getPage())
    this.http.get("http://localhost:3000/products/",{withCredentials:true}).subscribe(
      (res :any)=>{
        for(let i=0;i<res.data.length;i++){
          this.contributorsIds.push(res.data[i].contributor);
        
        }
        
        this.products= res.data;

        console.log(this.products)
        
      }
    )
  }
  getallnames(tab:string[]):void{
    for(let i =0 ; i<tab.length;i++){
    this.http.get(`http://localhost:3000/users/${tab[i]}`,{withCredentials:true}).subscribe(
      (res:any)=>{
          console.log(res)
          this.names.push(res.name)

      }
    )
  }}

  delete(id:string):void{
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe();
    alert("User deleted successfully")
    this.getallproducts()

  }

  setProductId(id:string){
    this.shared.setProductId(id);
  }

  next(){
    this.shared.incPage();

  }

  page1(index:number){
    console.log(typeof index)
    console.log(`http://localhost:3000/products?page=${index+1}`)
    this.http.get(`http://localhost:3000/products?page=${index+1}`,{withCredentials:true}).subscribe( (res :any)=>{
      this.products=res.data;
     
    }) 

  }

  page2(index:number){
    this.http.get(`http://localhost:3000/products?page=${index}`,{withCredentials:true}).subscribe( (res :any)=>{
      this.products=res.data
    })

  }
    
 

  loadMore():void{
    this.setFilters.emit({...this.filter,
  
      page:this.filter.page +1
    });
  
  }

  

  
}
