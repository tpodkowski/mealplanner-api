import { Module } from '@nestjs/common';
import { PrismaService } from '../services';
import { UsersService } from './users.service';

@Module({
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
