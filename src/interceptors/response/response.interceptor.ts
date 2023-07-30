import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Payment } from 'src/entity/payment.entity';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Payment> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Payment> {
    const request = context.switchToHttp().getRequest();

    Logger.log(request.headers, 'Headers');

    Logger.log(request.body, 'Body');

    Logger.log(request.params, 'Params');

    Logger.log(request.query, 'Query');

    return next.handle().pipe(
      map((response: Payment) => ({
        id: response.id,
        status: response.status,
        refNo: response.refNo,
        amount: response.amount,
        ...(response.paymentMethod && {
          paymentMethod: response.paymentMethod,
        }),
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      })),
    );
  }
}
