import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { Payment } from './entity/payment.entity';
import { HeadersDTO } from './dto/headers.dto';
import { PaymentStatus } from './shared/enums';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const HEADERS: HeadersDTO = {
  refNo: 'ref-no',
};

const PAYMENT: Payment = {
  id: 'payment-id',
  status: PaymentStatus.CREATED,
  refNo: 'ref-no',
  amount: 3000,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
};

describe('AppController', () => {
  let appController: AppController;
  let paymentRepository: Repository<Payment>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: getRepositoryToken(Payment),
          useValue: {
            save: jest.fn().mockResolvedValue(PAYMENT),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    paymentRepository = app.get(getRepositoryToken(Payment));
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(true).toBeTruthy();
    });
    it('should get payment by id', async () => {
      await expect(
        appController.getPayment(HEADERS, PAYMENT),
      ).resolves.toStrictEqual(PAYMENT);
    });
    it('should get payment by refno', async () => {
      await expect(
        appController.getPaymentByRefNo(HEADERS, PAYMENT),
      ).resolves.toStrictEqual(PAYMENT);
    });
    it('should create payment', async () => {
      await expect(
        appController.createPayment(HEADERS, { amount: 3000 }),
      ).resolves.toStrictEqual(PAYMENT);
      expect(paymentRepository.save).toHaveBeenCalledWith({
        refNo: 'ref-no',
        amount: 3000,
      });
    });
    it('should post payment', async () => {
      await expect(
        appController.postPayment(HEADERS, PAYMENT, {
          paymentMethod: 'bank_transfer',
        }),
      ).resolves.toStrictEqual(PAYMENT);
      expect(paymentRepository.save).toHaveBeenCalledWith({
        ...PAYMENT,
        paymentMethod: 'bank_transfer',
        status: PaymentStatus.SUCCESS,
      });
    });
    it('should reverse payment in CREATED status', async () => {
      await expect(
        appController.reversePayment(HEADERS, PAYMENT),
      ).resolves.toStrictEqual(PAYMENT);
      expect(paymentRepository.save).toHaveBeenCalledWith({
        ...PAYMENT,
        status: PaymentStatus.CANCELLED,
      });
    });
    it('should reverse payment in SUCCESS status', async () => {
      await expect(
        appController.reversePayment(HEADERS, {
          ...PAYMENT,
          status: PaymentStatus.SUCCESS,
        }),
      ).resolves.toStrictEqual(PAYMENT);
      expect(paymentRepository.save).toHaveBeenCalledWith({
        ...PAYMENT,
        status: PaymentStatus.REVERSED,
      });
    });
  });
});
