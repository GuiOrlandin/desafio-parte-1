import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Product } from '../entities/product';

export class ProductDto extends Product {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
