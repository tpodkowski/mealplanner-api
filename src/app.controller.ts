import { Controller, Get, Request, Post } from '@nestjs/common';
import { AuthService } from './auth';
import { Public } from './common/decorators';
import { UsersService } from './users/users.service';
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
  async register(@Request() req) {
    return this.usersService.create(req.body);
  }
}
