import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(user: any) {
    const validUser = await this.usersService.validateUser(
      user.email,
      user.password,
    );

    if (!validUser) {
      throw new UnauthorizedException();
    }

    const payload = { email: validUser.email, sub: validUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
