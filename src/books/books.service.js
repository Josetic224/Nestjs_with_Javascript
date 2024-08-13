import { Injectable } from '@nestjs/common';
import PrismaService from '../db/prisma.service';

@Injectable()
export class BooksService {
  constructor() {
    this.prisma = new PrismaService();
  }

  async createBook(data) {
    return this.prisma.books.create({
      data:{
        title:data.title,
        author:data.author,
        published:data.published,
        User:{
          connect:{
            id:data.UserId
          }
        }
      }
    });
  }

  async getBooks() {
    return this.prisma.books.findMany();
  }

  async getBook(id) {
    return this.prisma.books.findUnique({ where: { id: id } });
  }

  async updateBook(id, data) {
    return this.prisma.books.update({ where: { id: id } }, data);
  }

  async deleteBook(id) {
    return this.prisma.books.delete({ where: { id: id } });
  }
}

export default BooksService;
