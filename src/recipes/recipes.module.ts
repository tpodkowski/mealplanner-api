import { Module } from '@nestjs/common';
import { PrismaService } from '../services';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, PrismaService],
})
export class RecipesModule {}
