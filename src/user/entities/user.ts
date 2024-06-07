import { Product } from 'src/product/entities/product';

export class User {
  name: string;
  email: string;
  products?: Array<Product>;
}
