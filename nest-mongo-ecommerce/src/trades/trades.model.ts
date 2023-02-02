import * as mongoose from 'mongoose';

export const TradesSchema = new mongoose.Schema({
    traderOne: { type: String, required: true },
    traderTwo: { type: String, required: true },
    product: { type: String, required: true },
    price: { type: Number, required: true },
    status : {type : Number , required: true},

});

export interface Trades extends mongoose.Document {
  id: string;
  traderOne: string;
  traderTwo:string;
  product: string;
  price: number;
  status : number;
}