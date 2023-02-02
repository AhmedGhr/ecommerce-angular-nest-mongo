import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaiementsController } from './paiements.controller';
import { PaiementsSchema } from './paiements.model';
import { PaiementsService } from './paiements.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Paiements', schema: PaiementsSchema }])
    
  ],
  controllers:[PaiementsController],
  providers: [PaiementsService],
 
})
export class PaiementsModule {}
