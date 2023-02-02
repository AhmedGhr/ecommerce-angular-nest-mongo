import { Body, Controller, Post } from '@nestjs/common';
import { TradesService } from './trades.service';

@Controller('trades')
export class TradesController {

    constructor(private readonly paiementsService: TradesService) {}
  
    @Post()
    async createOneProduct(
        @Body('traderOne') traderOne: string,
        @Body('traderTwo') traderTwo: number,
        @Body('product') product: string,
        @Body('price') price: string,
        @Body('status') status: number,
        @Body('id') id: string,
       
    ) {
      const generatedId = await this.paiementsService.createOneProduct(
        traderOne,
        traderTwo,
        product,
        price,
        status,
        id
     
      );
      return { id: generatedId };
    }

}
