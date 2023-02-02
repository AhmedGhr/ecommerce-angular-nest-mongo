import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Product } from '../../../../nest-mongo-ecommerce/src/products/products.model';
import { Emitters } from '../emitters/emitters';
import { Filter } from '../models/filter';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cart=[];
  authenticated = false;

  id:string;
  @Input('filter') filter :Filter;
  @Input('products') products : Product[] = [];
  @Input('lastPage') lastPage: number;
  @Output('setFilters') setFilters = new EventEmitter();
  constructor(private http :HttpClient ,private shared : SharedService , private router :Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth:boolean) =>
    {
        this.authenticated=auth;
        
    })
    this.http.get('http://localhost:3000/users/user',{withCredentials:true}).subscribe(
      (res:any)=>{
        
        
        this.cart = res.cart;
        this.id=res._id;
      },
     
    );
    this.http.get("http://localhost:3000/products").subscribe(
      (res :any)=>{
        for(let i=0 ;i<res.data.length;i++){
          if(res.data[i].contributor != this.id){
            console.log("if worked!")
            console.log(res.data[i].contributor)
            
            
          }else{}
        }
        console.log(res.data.length)
        console.log("id:"+this.id)
        console.log(res.data[0].contributor)
       
    
      })
    
  }
    
  addtocart(product:any):void{
    console.log(product);
    if(this.authenticated){
    this.http.put(`http://localhost:3000/users/addtocart/${this.id}`,{"cart" : [product]}).subscribe(
      (res:any)=>{ this.router.navigate(['/']);
        alert("produit ajouté avec succés")
       
      }
    );}
    else{alert("Login first !")}
  }

  search(s:string):void{
    this.setFilters.emit({...this.filter ,s ,page:1
    });
    


}
sort(sort:string):void{
  this.setFilters.emit({...this.filter,

    sort ,page:1
  });

}

loadMore():void{
  this.setFilters.emit({...this.filter,

    page:this.filter.page + 1
  });

}

setProduct(product:Product):void{
   this.shared.setProduct(product);
  
}

images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }


}
