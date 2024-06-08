import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from '../entities/product';
import { UserSchema } from '../../user/schemas/user.schema';

export type ProductsDocument = HydratedDocument<ProductSchema>;

@Schema({ collection: 'products', timestamps: true })
export class ProductSchema implements Product {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: Types.ObjectId, ref: 'UserSchema', required: true })
  user: UserSchema;
}

export const ProductSchemaFactory = SchemaFactory.createForClass(ProductSchema);
