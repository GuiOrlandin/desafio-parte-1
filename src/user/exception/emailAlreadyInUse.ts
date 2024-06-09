import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class EmailAlreadyInUseException extends AppException {
  constructor() {
    super({
      message: 'Email ja em uso',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
