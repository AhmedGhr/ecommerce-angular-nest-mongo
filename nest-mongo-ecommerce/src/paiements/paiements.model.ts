import * as mongoose from 'mongoose';

export const PaiementsSchema = new mongoose.Schema({
    id:{type:String},
    contributor: { type: String},
    date: { type: String},
    price: { type: Number, required: true },
    

});

export interface Paiements extends mongoose.Document {
  id: string;
  contributor : string;
  date : string;
  price: number;
  
}