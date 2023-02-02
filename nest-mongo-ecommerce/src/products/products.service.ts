import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  /**
   * Create One User
   * @param title
   * @param type
   * @param description
   * @param image
   * @param price
   *  @param contributor
   */
  async createOneProduct(title:string ,type:string ,description: string, image: string, price: number , contributor : string) {
    const newProduct = new this.productModel({
    title, 
    type, 
    description,
    image,
    price,
    contributor,
    });
    const result = await newProduct.save();
    return result.id as string;
  }


   find(options){
    return this.productModel.find(options);
  }

  count(options){
    return this.productModel.count(options).exec()
  }
  /**
   * Get All Products
   */
  async getAllProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      title:product.title,
      type:product.type,
      description: product.description,
      image: product.image,
      price: product.price,
      contributor : product.contributor
    }));
  }

  

  /**
   * Get One User
   * @param productId
   */
  async getOneProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
        id: product.id,
        title:product.title,
        type:product.type,
        description: product.description,
        image: product.image,
        price: product.price,
        contributor : product.contributor


    };
  }

  async updateProduct(
    productId: string,
    title:string,
    type:string,
    description: string,
    image: string,
    price: number,
  ) {
    const modProduct = await this.findProduct(productId);

    //Only modify Values passed
    if (title) modProduct.title = title;
    if (type) modProduct.type = type;
    if (description) modProduct.description = description;
    if (image) modProduct.image = image;
    if (price) modProduct.price = price;

    modProduct.save();
  }

  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({ _id: productId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

     async findProduct(id: string): Promise<Product> {
    let user: any;
    try {
      user = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!user) {
      throw new NotFoundException('Could not find product.');
    }
    return user;
  }
 


}
