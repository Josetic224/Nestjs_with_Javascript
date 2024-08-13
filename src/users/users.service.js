import { BadRequestException, Injectable } from '@nestjs/common';
import PrismaService from '../db/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor() {
    this.prisma = new PrismaService();
  }

  async Hello() {
    return 'Hello World';
  }
  async registerUser(data) {
    const hashedPaswword = hashSync(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPaswword,
      },
    });
  }

  async findUserByEmail(email) {
    const _getEmail = this.prisma.user.findUnique({ where: { email: email } });
    return  _getEmail 
  }

  async findUserById(id){
    return this.prisma.user.findUnique({where:{id:id}})
  }

}



export default UsersService;
