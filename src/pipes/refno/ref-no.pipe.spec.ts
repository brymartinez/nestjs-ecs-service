import { PaymentNotFoundException } from 'src/exceptions/payment-not-found.exception';
import { RefNoPipe } from './ref-no.pipe';

describe('RefNoPipe', () => {
  const mockedRepository: any = {
    findOneBy: jest.fn().mockImplementation((arg) => {
      console.log(arg);
      if (arg?.refNo === 'id') return {};
      return undefined;
    }),
  };
  it('should be defined', () => {
    expect(new RefNoPipe(mockedRepository)).toBeDefined();
  });
  it('should not throw', async () => {
    await expect(
      new RefNoPipe(mockedRepository).transform('id', undefined),
    ).resolves.toStrictEqual({});
  });
  it('should throw on find error', async () => {
    await expect(
      new RefNoPipe(mockedRepository).transform('non-id', undefined),
    ).rejects.toThrowError(PaymentNotFoundException);
  });
});
