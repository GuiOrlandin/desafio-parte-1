import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ProductSchema,
  ProductsDocument,
} from '../product/schemas/product.schema';
import { ProductDto } from './dto/productDto';
import { Product } from './entities/product';
import { UserDocument, UserSchema } from '../user/schemas/user.schema';
import { ProductNotFoundException } from './exceptions/productNotFoundException';
import { UserNotAuthorizedException } from '../user/exception/userNotAuthorizedException';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductSchema.name) private productModel: Model<ProductSchema>,
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
  ) {}
  async create(createProduct: ProductDto, email: string): Promise<Product> {
    const user = await this.userModel.findOne<UserDocument>({ email: email });

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    const newProduct = new this.productModel({
      ...createProduct,
      user: user._id,
    });

    const createdProduct = await newProduct.save();

    user.products.push(newProduct);
    await user.save();

    return this.productModel.findById(createdProduct._id).exec();
  }

  async findAll(): Promise<Array<Product>> {
    return await this.productModel.find<ProductsDocument>().exec();
  }

  async findOne(_id: string): Promise<Product> {
    const product = await this.productModel
      .findOne<ProductsDocument>({ _id: _id })
      .exec();

    return product;
  }

  async update(
    _id: string,
    updateProductDto: ProductDto,
    userId: string,
  ): Promise<boolean> {
    const user = await this.userModel.findOne({ user: userId }).exec();

    if (!user) {
      throw new UserNotAuthorizedException();
    }

    const updatedProduct = await this.productModel
      .findOneAndUpdate({ _id: _id }, updateProductDto)
      .exec();

    if (!updatedProduct) {
      throw new ProductNotFoundException();
    }

    await updatedProduct.save();
    return true;
  }

  async remove(_id: string, userId: string): Promise<boolean> {
    const user = await this.userModel.findOne({ user: userId }).exec();

    if (!user) {
      throw new UserNotAuthorizedException();
    }

    const ProductToBeDeleted = await this.productModel
      .findOneAndDelete({ _id: _id })
      .exec();

    if (!ProductToBeDeleted) {
      throw new ProductNotFoundException();
    }

    return true;
  }
}
