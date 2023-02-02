import { Injectable } from '@angular/core';
import { Product } from '../../../../nest-mongo-ecommerce/src/products/products.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 product : Product
 userId:string;
 productId:string;
 page:number=1;
 contributorsIds:string[]=[];
 productsNumber:number=0;
 products:Product[]=[];
  constructor() { }

  setProduct(product:Product){
    this.product=product;
  }

  getProduct(){
    return this.product;
  }

  setUserId(userId:string){
    this.userId=userId;
  }

  getUserId(){
    return this.userId;
  }

  setProductId(id:string){
    this.productId=id;
  }
  getProductId(){
    return this.productId;
  }

  incPage(){
    this.page+=1
    return this.page
  }
  getPage(){
    return this.page;
  }

  setcontributorsIds(tab:string[]){
    this.contributorsIds=tab;
    
  }
  getContributorsIds(){
    return this.contributorsIds;
  }


  setMyProductsNumber(n:number){
    this.productsNumber=n;
    
  }
  getMyProductsNumber(){
    return this.productsNumber;
  }

  setMyProducts(p:Product[]){
    this.products=p;
    
  }
  getMyProducts(){
    return this.products;
  }

}
