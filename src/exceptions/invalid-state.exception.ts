import { HttpException, HttpStatus } from '@nestjs/common';
import { APIError } from './api-error';

export class InvalidStateException extends HttpException {
  constructor() {
    const error: APIError = {
      code: 'PE002',
      msg: 'Payment state invalid.',
    };
    super(error, HttpStatus.BAD_REQUEST);
  }
}
