import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { APIError } from './api-error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: APIError = {
      code: 'PE999',
      msg: 'Unable to process request. Please contact system administrator.',
    };

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      responseBody = exception.getResponse() as APIError;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
