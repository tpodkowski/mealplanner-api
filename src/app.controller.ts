import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, AuthService, LocalAuthGuard } from './auth';
import { Public } from './common/decorators';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
