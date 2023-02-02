import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaiementsService } from './paiements.service';

@Controller('paiements')
export class PaiementsController {
    constructor(private readonly paiementsService: PaiementsService) {}
  
    @Post()
    async createOneProduct(
        @Body('contributor') contributor: string,
        @Body('price') price: number,
        @Body('date') date: string,
        @Body('id') id: string,
       
    ) {
      const generatedId = await this.paiementsService.createOneProduct(
        contributor,
        price,
        date,
        id
     
      );
      return { id: generatedId };
    }

    @Get()
    getAllPaiements() {
      return this.paiementsService.getAllPaiements();
    }


}

