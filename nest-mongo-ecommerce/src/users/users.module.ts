import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }],),JwtModule.register({secret :'secret' , signOptions : {expiresIn : '1d'}})
    
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}