import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trades } from './trades.model';

@Injectable()
export class TradesService {
    constructor(@InjectModel('Trades') private readonly tradesModel: Model<Trades> ) {}

/**
   * Create One User
     @param traderOne
   * @param traderTwo
     @param product
     @param price
     @param status
   * 
   */
        async createOneProduct( traderOne : string,traderTwo: number ,product:string ,price:string,status:number,id:string  ) {
            const newTrade = new this.tradesModel({
                traderOne,
                traderTwo,
                product,
                price,
                status,
                id
            });
            const result = await newTrade.save();
            return result.id as string;
          }

}
