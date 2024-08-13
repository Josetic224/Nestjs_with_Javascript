import {
  BadRequestException,
  Bind,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req
} from '@nestjs/common';
import BooksService from './books.service';
import UsersService from '../users/users.service';

@Controller('books')
export class BooksController {
  constructor() {
    this.BooksService = new BooksService();
    this.UsersService = new UsersService()
  }

  @Post('create/:id')
  @Bind(Req(), Body())
  async createBook(request) {
    try {
      const UserId = request.params.id
      
      console.log(UserId);
      //UserId = id
       const data = request.body 
       data.UserId = UserId
       console.log("received data" , request.body)

      //const _checkUserById = await this.UsersService.findUserById(id)

      //  if(!_checkUserById){
      //   return new BadRequestException("userId not found!")
      //  }
      //  data.UserId = id
       const _createdBooks = await this.BooksService.createBook(data,UserId)
       console.log(_createdBooks)
       if(!_createdBooks){
        throw new BadRequestException("could create Books")
       }
       return {statusCode:201, message:"Books created Successfully",
        data:_createdBooks
       }
    } catch (error) {
        throw new BadRequestException(error.message)
    }
   
  }

  @Get('/')
  async getBooks() {
    try {
      const books = await this.BooksService.getBooks();
      if (!books) {
        throw new BadRequestException('No Books found!');
      }
      return { statusCode: 201, message: books };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
