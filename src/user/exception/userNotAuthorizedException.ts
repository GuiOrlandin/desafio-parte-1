import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appExceptions';

export class UserNotAuthorizedException extends AppException {
  constructor() {
    super({
      message: 'Usuário não autorizado',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
