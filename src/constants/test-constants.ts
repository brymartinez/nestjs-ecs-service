import { HeadersDTO } from 'src/dto/headers.dto';
import { Payment } from 'src/entity/payment.entity';
import { PaymentStatus } from 'src/shared/enums';

export const HEADERS: HeadersDTO = {
  refNo: 'ref-no',
};

export const PAYMENT: Payment = {
  id: 'payment-id',
  status: PaymentStatus.CREATED,
  refNo: 'ref-no',
  amount: 3000,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
};
