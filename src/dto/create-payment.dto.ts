import { Payment } from 'src/entity/payment.entity';

export class CreatePaymentDTO implements Pick<Payment, 'amount'> {
  amount: number;
}
