import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    BadRequestException,
    Res,
    Req,
    UnauthorizedException,
    Put,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response ,Request } from 'express';
import { stringify } from 'node:querystring';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService ,
      private jwtService : JwtService) {}
  
    @Post('add')
    async createOneUser(
      @Body('email') email: string,
      @Body('name') name: string,
      @Body('password') password: string,
      @Body('phone') phone: number,
      @Body('cart') cart: any,
    ) { const hashedPassword = await bcrypt.hash(password,12);
      const generatedId = await this.usersService.createOneUser(
        
        email,
        name,
        hashedPassword,
        phone,
        cart
      );
      return { id: generatedId };
    }
  
    @Get()
    getAllUsers() {
      return this.usersService.getAllUsers();
    }
    @Get('user') async test(@Req() request : Request){
      try{
      const cookie = request.cookies['jwt']; 
      const data = await this.jwtService.verifyAsync(cookie);
      if(!data){
        throw new UnauthorizedException();

      }
     
      const user = await this.usersService.findUser(data['id']);
      const {password , ...result} = user;
      return user;
      


      return data;}
      catch (e) 
      {
          throw new UnauthorizedException();
      }

  }
    @Get(':id')
    getOneUser(@Param('id') userId: string) {
      return this.usersService.getOneUser(userId);
    }
  
    @Patch(':id')
   async updateUser(
      @Param('id') userId: string,
      @Body('email') userEmail: string,
      @Body('name') userName: string,
      @Body('password') userPassword: string,
      @Body('phone') userPhone: number,
      @Body('cart') userCart: any,
    ) {
      const hashedPassword = await bcrypt.hash(userPassword,12);
      this.usersService.updateUser(userId,userEmail, userName, hashedPassword, userPhone , userCart);
      return null;
    }

    @Put(':id')
   async updateUs(
      @Param('id') userId: string,
      @Body('email') userEmail: string,
      @Body('name') userName: string,
      @Body('password') userPassword: string,
      @Body('phone') userPhone: number,
      @Body('cart') userCart: {}[],
    ) {
      const hashedPassword = await bcrypt.hash(userPassword,12);
      this.usersService.updateUser(userId,userEmail, userName, hashedPassword, userPhone , userCart);
      return null;
    }
    
    
  @Put('addtocart/:id')
  
  addtocart(@Body('cart') usercart: {}[] , @Param('id') userId :string, ){
    this.usersService.addtocart(userId ,usercart);
    return null;

  }


  



    @Delete(':id/emptycart')
    emptycart(
      @Param('id') userid:string 
    )
    {
      this.usersService.emptycart(userid)
    }

    @Delete(':id')
    deleteUser(@Param('id') userId: string) {
      this.usersService.deleteUser(userId);
      return null;
    }
    @Post('login')
    async login(
      @Body("email") email:string,
     @Body("password") password :string,
     @Res({passthrough:true}) response: Response
    ){
      const user = await this.usersService.findOne({email});
      if(!user){
        throw new BadRequestException('Invalid information');
      }
      if(!await bcrypt.compare(password,user.password))
      {
        throw new BadRequestException('Invalid paassword');
      }
      const jwt = await this.jwtService.signAsync({id : user.id});
      response.cookie('jwt',jwt,{httpOnly:true});
      return {
        message : "Success"
      };
     
    }
    @Post('logout')
    async logout(@Res({passthrough:true}) response: Response)
      {
          response.clearCookie('jwt');
          return{message : "Logged out successuf"}
      }

     
   
    
  }