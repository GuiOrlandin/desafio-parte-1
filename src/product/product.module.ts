import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductSchema,
  ProductSchemaFactory,
} from 'src/product/schemas/product.schema';
import { ProductsController } from './product.controller';
import { UsersService } from 'src/user/user.service';
import { ProductService } from './product.service';
import { UserSchema, UserSchemaFactory } from 'src/user/schemas/user.schema';
import { UsersController } from 'src/user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductSchema.name, schema: ProductSchemaFactory },
    ]),
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchemaFactory },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductService, UsersService],
  exports: [ProductService, UsersService],
})
export class ProductModule {}
