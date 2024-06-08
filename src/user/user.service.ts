import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, UserSchema } from './schemas/user.schema';
import { ProductSchema } from 'src/product/schemas/product.schema';
import { UserDto } from './dto/userDto';
import { User } from './entities/user';
import { compare, hash } from 'bcrypt';
import { UserNotAuthorizedException } from './exception/userNotAuthorizedException';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
    @InjectModel(ProductSchema.name) private productModel: Model<ProductSchema>,
  ) {}
  async create(createUserDto: UserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password, 10);

    const user = new this.userModel({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
      products: createUserDto.products || [],
    });

    const createdUser = await this.userModel.create<UserDocument>(user);

    await createdUser.save();

    return this.userModel
      .findById(createdUser._id)
      .select('-password -products')
      .exec();
  }

  async findOne(email: string, password: string): Promise<User> {
    const user = await this.userModel
      .findOne<UserDocument>({ email: email })
      .populate('products', '', this.productModel)
      .exec();

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UserNotAuthorizedException();
    }

    return user;
  }

  async findOneTest(email: string): Promise<User> {
    const user = await this.userModel
      .findOne<UserDocument>({ email: email })
      .populate('products', '', this.productModel)
      .exec();

    return user;
  }

  async update(email: string, updateUserDto: UserDto): Promise<boolean> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ email: email }, updateUserDto)
      .exec();
    if (!updatedUser) return false;
    await updatedUser.save();
    return true;
  }

  async remove(email: string): Promise<boolean> {
    const userToBeDeleted = await this.userModel
      .findOneAndDelete({ email: email })
      .exec();
    if (!userToBeDeleted) return false;
    return true;
  }
}
