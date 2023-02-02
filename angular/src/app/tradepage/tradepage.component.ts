import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-tradepage',
  templateUrl: './tradepage.component.html',
  styleUrls: ['./tradepage.component.css']
})
export class TradepageComponent implements OnInit {
  form : FormGroup;
  productToTrade:string;

  constructor(private shared:SharedService) { }

  ngOnInit(): void {
    this.productToTrade=this.shared.getProduct().title;
    console.log(this.productToTrade)
  }

}
