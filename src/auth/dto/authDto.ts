import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Auth } from '../entities/auth';

export class AuthDto extends Auth {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
