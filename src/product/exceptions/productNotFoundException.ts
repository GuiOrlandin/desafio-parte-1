import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appExceptions';

export class ProductNotFoundException extends AppException {
  constructor() {
    super({
      message: 'o produto não foi encontrado!',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
