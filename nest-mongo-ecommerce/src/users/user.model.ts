import * as mongoose from 'mongoose';
import {Product} from 'src/products/products.model'
export const UserSchema = new mongoose.Schema({
    
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    cart : {type : Array , default : [{}]}
});

export interface User extends mongoose.Document {
  id: string;
  email: string;
  name: string;
  password: string;
  phone: number;
  cart : any[];
}