import { HttpException, HttpStatus } from '@nestjs/common';
import { APIError } from './api-error';

export class ValidationException extends HttpException {
  constructor(msg: string) {
    const error: APIError = {
      code: 'PY002',
      msg,
    };
    super(error, HttpStatus.BAD_REQUEST);
  }
}
