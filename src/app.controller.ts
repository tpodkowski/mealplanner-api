import { Controller, Get, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth';
import { Public } from './common/decorators';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Get()
  async home() {
    return 'ಠ_ಠ';
  }

  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
