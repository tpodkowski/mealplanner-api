import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateRecipeDto) {
    return await this.prisma.recipe.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.prisma.recipe.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.recipe.findFirst({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async update(id: number, updateProductDto: UpdateRecipeDto) {
    return await this.prisma.recipe.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.recipe.delete({
      where: { id },
    });
  }
}
