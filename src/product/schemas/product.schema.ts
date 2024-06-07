import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from '../entities/product';

export type ProductsDocument = HydratedDocument<ProductSchema>;

@Schema({ collection: 'products', timestamps: true })
export class ProductSchema implements Product {
  @Prop({ required: true })
  descrição: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  preço: number;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  estoque: boolean;
}

export const ProductSchemaFactory = SchemaFactory.createForClass(ProductSchema);
