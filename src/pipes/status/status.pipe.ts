import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Payment } from 'src/entity/payment.entity';
import { InvalidStateException } from 'src/exceptions/invalid-state.exception';
import { PaymentStatus } from 'src/shared/enums';

@Injectable()
export class StatusPipe implements PipeTransform {
  private statusArray: PaymentStatus[];
  constructor(statusArray: PaymentStatus[]) {
    this.statusArray = statusArray;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(payment: Payment, _metadata: ArgumentMetadata) {
    if (!this.statusArray.includes(payment.status)) {
      throw new InvalidStateException();
    }
    return payment;
  }
}
