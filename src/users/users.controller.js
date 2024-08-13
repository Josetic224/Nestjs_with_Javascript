import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Req,
  Request,
  Res,
  Bind,
  Response,
  HttpStatus,
} from '@nestjs/common';
import UsersService from './users.service';

@Controller('users')
export class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  @Get('hello')
  async getHello() {
    return this.usersService.Hello();
  }

  @Post('register')
  @Bind(Req(), Body()) // Bind the whole request
  async register(request, res) {
    try {
      const data = request.body; // Access the body from the request object

      console.log('Received data:', data); // Debugging line

      const existingUser = await this.usersService.findUserByEmail(data.email);

      if (existingUser) {
        throw new BadRequestException('Email is already in use!');
      }

      const response = await this.usersService.registerUser(data);
      return { statusCode: 201, message: response };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
