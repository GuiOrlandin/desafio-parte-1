import { Product } from 'src/product/entities/product';

export class User {
  email: string;
  products?: Array<Product>;
}
