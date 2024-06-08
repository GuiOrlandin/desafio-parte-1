import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthDto } from './dto/authDto';
import { Public } from './decorators/constants';
import { AuthenticatedRequestSchema } from './schema/authenticateRequest.schema';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() auth: AuthDto) {
    return await this.authService.signIn(auth.email, auth.password);
  }

  @UseGuards(AuthGuard)
  getProfile(@Request() req: AuthenticatedRequestSchema) {
    return req.user;
  }
}
