import { IsNumber, IsString } from 'class-validator';
import { Payment } from 'src/entity/payment.entity';

export class CreatePaymentDTO implements Pick<Payment, 'amount' | 'refNo'> {
  @IsNumber()
  amount: number;

  @IsString()
  refNo: string;
}
