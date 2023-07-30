import { APIError } from './api-error';
import { HttpExceptionFilter } from './http-exception.filter';
import { HttpException, HttpStatus } from '@nestjs/common';

const CONTEXT: any = {
  switchToHttp: () => ({
    getResponse: () => ({
      msg: 'response',
    }),
  }),
};

const HTTP_ARGUMENT_HOST: any = {
  httpAdapter: {
    reply: jest.fn(),
  },
};

describe('HttpExceptionFilter', () => {
  const filter = new HttpExceptionFilter(HTTP_ARGUMENT_HOST);
  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
  it('should return http exception', () => {
    expect(
      filter.catch(
        new HttpException('message', HttpStatus.BAD_REQUEST),
        CONTEXT,
      ),
    ).toStrictEqual(undefined);

    expect(HTTP_ARGUMENT_HOST.httpAdapter.reply).toHaveBeenCalledWith(
      {
        msg: 'response',
      },
      'message',
      400,
    );
  });
  it('should return non-http exception', () => {
    expect(filter.catch(new APIError(), CONTEXT)).toStrictEqual(undefined);

    expect(HTTP_ARGUMENT_HOST.httpAdapter.reply).toHaveBeenCalledWith(
      { msg: 'response' },
      {
        code: 'PE999',
        msg: 'Unable to process request. Please contact system administrator.',
      },
      500,
    );
  });
});
