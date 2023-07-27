import { IsNumber, IsString } from 'class-validator';
import { Payment } from 'src/entity/payment.entity';

export class CreatePaymentDTO implements Pick<Payment, 'amount' | 'refNo'> {
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsString()
  refNo: string;
}
