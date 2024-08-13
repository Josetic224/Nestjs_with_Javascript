import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import PrismaService from './db/prisma.service';

@Module({
  imports: [UsersModule, BooksModule],
  providers: [PrismaService],
})
export class AppModule {}
