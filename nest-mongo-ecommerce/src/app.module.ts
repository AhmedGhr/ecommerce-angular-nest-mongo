import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from './users/users.module'
import {MongooseModule} from '@nestjs/mongoose';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductssModule } from './products/products.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { PaiementsController } from './paiements/paiements.controller';
import { PaiementsModule } from './paiements/paiements.module';
import { Cloudinary } from './cloudinary';
import { TradesController } from './trades/trades.controller';
import { TradesService } from './trades/trades.service';
import { TradesModule } from './trades/trades.module';



@Module({
  imports: [ProductssModule,
    UsersModule,
    PaiementsModule,
    MulterModule,
    TradesModule,
    MongooseModule.forRoot('mongodb+srv://ahmed:root@cluster0.or386.mongodb.net/ecommerce',{autoCreate:true}),JwtModule.register({secret :'secret' , signOptions : {expiresIn : '1d'}}) ],
  controllers: [AppController],
  providers: [AppService, Cloudinary,],
})
export class AppModule {}