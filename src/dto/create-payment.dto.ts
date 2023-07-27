import { IsNumber } from 'class-validator';
import { Payment } from 'src/entity/payment.entity';

export class CreatePaymentDTO implements Pick<Payment, 'amount'> {
  @IsNumber()
  amount: number;
}
