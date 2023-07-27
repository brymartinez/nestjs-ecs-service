import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entity/payment.entity';
import { Repository } from 'typeorm';
import { PaymentNotFoundException } from '../../exceptions/payment-not-found.exception';

@Injectable()
export class PaymentPipe implements PipeTransform {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, _metadata: ArgumentMetadata): Promise<Payment> {
    const result = await this.paymentRepository.findOneBy({ id: value });
    if (!result) {
      throw new PaymentNotFoundException();
    }
    return result;
  }
}
