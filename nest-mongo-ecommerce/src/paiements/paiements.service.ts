import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomInt } from 'node:crypto';
import { Paiements } from './paiements.model';

@Injectable()
export class PaiementsService {
    constructor(@InjectModel('Paiements') private readonly paiementsModel: Model<Paiements> ) {}

 /**
   * Create One User
        @param contributor
   * @param price
   * 
   */
  async createOneProduct( contributor : string,price: number ,date:string ,id:string  ) {
    const newPaiement = new this.paiementsModel({
    id,
    price,
    date,
    contributor,
    });
    const result = await newPaiement.save();
    return result.id as string;
  }

  async getAllPaiements() {
    const paiements = await this.paiementsModel.find().exec();
    return paiements.map((paiement) => ({
        id:paiement.id,
        date:paiement.date,
      contributor:paiement.contributor,
      price:paiement.price
    }));
  }

}
