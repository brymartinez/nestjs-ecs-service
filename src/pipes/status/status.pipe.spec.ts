import { PaymentStatus } from 'src/shared/enums';
import { StatusPipe } from './status.pipe';
import { PAYMENT } from 'src/constants/test-constants';
import { InvalidStateException } from 'src/exceptions/invalid-state.exception';

describe('StatusPipe', () => {
  it('should be defined', () => {
    expect(new StatusPipe([PaymentStatus.CREATED])).toBeDefined();
  });
  it('should allow valid status', async () => {
    const pipe = new StatusPipe([PaymentStatus.CREATED]);

    expect(pipe.transform(PAYMENT, null)).toStrictEqual(PAYMENT);
  });
  it('should disallow ivalid status', async () => {
    const pipe = new StatusPipe([PaymentStatus.FAILED]);

    expect(() => pipe.transform(PAYMENT, null)).toThrowError(
      InvalidStateException,
    );
  });
});
