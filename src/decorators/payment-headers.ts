import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaymentHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers;

    return {
      refNo: headers.refNo,
    };
  },
);
