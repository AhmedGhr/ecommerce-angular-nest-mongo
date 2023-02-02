import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    contributor : {type : String},

});

export interface Product extends mongoose.Document {
  id: string;
  title: string;
  type:string;
  description: string;
  image: string;
  price: number;
  contributor : string;
}