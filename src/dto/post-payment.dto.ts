import { Payment } from 'src/entity/payment.entity';

export class PostPaymentDTO implements Pick<Payment, 'paymentMethod'> {
  paymentMethod: string;
}
