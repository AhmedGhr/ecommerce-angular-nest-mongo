import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { Product } from 'src/products/products.model';
import {User} from 'src/users/user.model';



@Injectable()

export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Create One User
   * @param email
   * @param name
   * @param password
   * @param phone
   * @param cart
   */
  async createOneUser(email:string ,name: string, password: string, phone: number , cart :any) {
    const newUser = new this.userModel({
    email,  
    name,
      password,
      phone,
      cart
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async addToCart(cart:any){
    const cartt = new this.userModel({cart});
    const result = await cartt.save();
  return result;
  }
    

  /**
   * Get All Users
   */
  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      email:user.email,
      name: user.name,
      password: user.password,
      phone: user.phone,
      cart: user.cart,
    }));
  }

  /**
   * Get One User
   * @param userId
   */
  async getOneUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      email:user.email,
      name: user.name,
      password: user.password,
      phone: user.phone,
      cart: user.cart,

    };
  }

  async updateUser(
    userId: string,
    email:string,
    name: string,
    password: string,
    phone: number,
    cart : any[],
  ) {
    const modUser = await this.findUser(userId);

    //Only modify Values passed
    if (email) modUser.email = email;
    if (name) modUser.name = name;
    if (password) modUser.password = password;
    if (phone) modUser.phone = phone;
    if (cart) modUser.cart = [...modUser.cart, ...cart] ;

    modUser.save();
  }
  async addtocart(
    userId: string,
   
    
    cart : any[],
  ) {
    const modUser = await this.findUser(userId);

    //Only modify Values passed
    
    if (cart) modUser.cart = [...modUser.cart, ...cart] ;

    modUser.save();
  }


  async deleteItemFromCart(){}
  async emptycart(
    userId: string,
   
    
    
  ) {
    const modUser = await this.findUser(userId);

    //Only modify Values passed
    
     modUser.cart = [] ;

    modUser.save();
  }
  

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

   async findUser(id: string): Promise<User> {
    let user: any;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

     async findOne(condition : any): Promise<User> {
    return this.userModel.findOne(condition);
    
  }
}
