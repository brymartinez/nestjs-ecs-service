import { CreatePaymentDTO } from 'src/dto/create-payment.dto';
import { ValidationPipe } from './validation.pipe';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new ValidationPipe()).toBeDefined();
  });
  it('should validate create payment dto', async () => {
    const pipe = new ValidationPipe();
    const input: CreatePaymentDTO = {
      amount: 3000,
    };
    await expect(
      pipe.transform(input, {
        metatype: CreatePaymentDTO,
      } as any),
    ).resolves.not.toThrow();
  });
  it('should throw on create payment dto', async () => {
    const pipe = new ValidationPipe();
    const input = {
      amount: '3000',
    };
    await expect(
      pipe.transform(input, {
        metatype: CreatePaymentDTO,
      } as any),
    ).rejects.toThrow();
  });
});
