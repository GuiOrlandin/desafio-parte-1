import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../entities/user';
import { ProductSchema } from 'src/product/schemas/product.schema';

export type UserDocument = HydratedDocument<UserSchema>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema implements User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductSchema' }],
  })
  products?: ProductSchema[];
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
