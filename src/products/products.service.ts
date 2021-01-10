import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(user, createProductDto: CreateProductDto) {
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        products: {
          create: createProductDto,
        },
      },
    });
  }

  async findAll(user) {
    return await this.prisma.product.findMany({
      where: { authorId: user.id },
    });
  }

  async findOne(id: number) {
    return await this.prisma.product.findFirst({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
