import { IsString } from 'class-validator';
import { Payment } from 'src/entity/payment.entity';

export class PostPaymentDTO implements Pick<Payment, 'paymentMethod'> {
  @IsString()
  paymentMethod: string;
}
