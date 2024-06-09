import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = {
      userEmail: user.email,
    };
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    return token;
  }
}
