import { Injectable } from '@nestjs/common';
import { StringFilter } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import { StringDecoder } from 'string_decoder';
import { PrismaService } from '../services';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private getUserResponse(user: User) {
    const { password, isAdmin, ...result } = user;

    return result;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (isPasswordValid) {
      return this.getUserResponse(user);
    }
    return null;
  }

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const usersSalt = await genSalt(saltRounds);
    const usersHash = await hash(createUserDto.password, usersSalt);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: usersHash,
        isAdmin: false,
      },
    });

    return this.getUserResponse(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
}
