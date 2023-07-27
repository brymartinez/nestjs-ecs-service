import { HttpException, HttpStatus } from '@nestjs/common';
import { APIError } from './api-error';

export class PaymentNotFoundException extends HttpException {
  constructor() {
    const error: APIError = {
      code: 'PE001',
      msg: 'Payment not found.',
    };
    super(error, HttpStatus.NOT_FOUND);
  }
}
