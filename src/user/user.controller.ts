import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { Public } from 'src/auth/decorators/constants';
import { UserDto } from './dto/userDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
