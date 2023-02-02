import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    Patch,
    Delete,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Req,
    Res,
  } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { request, response } from 'express';
  import { ProductsService } from './products.service';
  import {Request} from 'express';
import { createWriteStream } from 'fs';
import {diskStorage} from 'multer';
import{Helper} from '../shared/helper'
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) {}
  
    @Post()
    @UseInterceptors(FilesInterceptor("image",null,
    {
      storage:diskStorage({
        destination:Helper.filePath,
      filename:Helper.customFileName

    })}))
    async createOneProduct(
      @UploadedFiles() files,
    @Body('title') title: string,
    @Body('type') type: string,
      @Body('description') description: string,
      @Body('image') image: string,
      @Body('price') price: number,
      @Body('contributor') contributor: string,
    ) {
      const generatedId = await this.ProductsService.createOneProduct(
        title,
        type,
        description,
        image,
        price,
        contributor,
      );
      console.log(files)
      return { id: generatedId };
    }
  
    
    


    @Get()
    async getAllProducts(@Req() req: Request) {
      let options = {}
      if(req.query.s){
        options = {
          $or:[
            {title: new RegExp(req.query.s.toString(), 'i')},
            {description :new RegExp(req.query.s.toString(),'i')}
          ]
        }
      }
      
      const query = this.ProductsService.find(options);
      if(req.query.sort){
        query.sort(
          {price :req.query.sort}
        )
      }
      const page : number = parseInt( req.query.page as any) || 1;
      const limit = 9;
      const total = await this.ProductsService.count(options);
      const data =  await query.skip((page -1) * limit).limit(limit).exec()
      return {data , page ,total , last_page:Math.ceil(total /limit)};
    }

    

  
    @Get('search')
    search(@Req() req: Request) {
      let options = {}
      if(req.query.s){
        options = {
          $or:[
            {title: new RegExp(req.query.s.toString(), 'i')},
            {description :new RegExp(req.query.s.toString(),'i')}
          ]
        }
      }
      const query = this.ProductsService.find(options);

      if(req.query.sort){
        query.sort(
          {price :req.query.sort}
        )
      }
      const page : number = parseInt( req.query.page as any) || 1;
      const limit = 9;
      const data =  query.skip((page -1) * limit).limit(limit).exec()
      return data;
    }



    @Get(':id')
    getOneUser(@Param('id') productId: string) {
      return this.ProductsService.getOneProduct(productId);
    }
  
    @Patch(':id')
    updateProduct(
      @Param('id') prodId: string,
      @Body('title') prodTitle: string,
      @Body('type') prodType: string,
      @Body('description') prodDesc: string,
      @Body('image') prodImg: string,
      @Body('price') userPrice: number,
    ) {
      this.ProductsService.updateProduct(prodId,prodTitle, prodType, prodDesc, prodImg, userPrice);
      return null;
    }
  
    @Delete(':id')
    deleteUser(@Param('id') prodId: string) {
      this.ProductsService.deleteProduct(prodId);
      return null;
    }


    @Post('upload')
    @UseInterceptors(FilesInterceptor("image",null,
    {
      storage:diskStorage({
        destination:Helper.filePath,
      filename:Helper.customFileName

    })}))
    uploadFile( @UploadedFiles() files){
      
    
      console.log(files);
      return {name:files[0].filename}
    
     
      
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath')image,@Res() res){
       return res.sendFile(image,{root:'uploads'});
    }

    
  }