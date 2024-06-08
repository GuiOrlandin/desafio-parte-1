import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../exceptions/appException';

export class UserNotAuthorizedException extends AppException {
  constructor() {
    super({
      message: 'Usuário não autorizado',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
