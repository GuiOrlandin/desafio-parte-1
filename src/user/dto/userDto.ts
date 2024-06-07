import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { User } from '../entities/user';

export class UserDto extends User {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
