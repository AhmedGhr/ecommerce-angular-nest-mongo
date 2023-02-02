import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradesSchema } from './trades.model';
import { TradesController } from './trades.controller';
import { TradesService } from './trades.service';

@Module({

    imports: [
        MongooseModule.forFeature([{ name: 'Trades', schema: TradesSchema }])
        
      ],
      controllers:[TradesController],
      providers: [TradesService],
})
export class TradesModule {}
