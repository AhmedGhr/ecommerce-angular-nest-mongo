import { Module ,  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './products.model';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MulterModule.register({
      dest : './uploads'
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductssModule {}