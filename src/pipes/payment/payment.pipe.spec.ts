import { PaymentNotFoundException } from 'src/exceptions/payment-not-found.exception';
import { PaymentPipe } from './payment.pipe';

describe('PaymentPipe', () => {
  const mockedRepository: any = {
    findOneBy: jest.fn().mockImplementation((arg) => {
      console.log(arg);
      if (arg?.id === 'id') return {};
      return undefined;
    }),
  };
  it('should be defined', () => {
    expect(new PaymentPipe(mockedRepository)).toBeDefined();
  });
  it('should not throw', async () => {
    await expect(
      new PaymentPipe(mockedRepository).transform('id', undefined),
    ).resolves.toStrictEqual({});
  });
  it('should throw on find error', async () => {
    await expect(
      new PaymentPipe(mockedRepository).transform('non-id', undefined),
    ).rejects.toThrowError(PaymentNotFoundException);
  });
});
