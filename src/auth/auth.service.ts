import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    const validUser = await this.usersService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
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
