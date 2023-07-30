import { first, lastValueFrom, of } from 'rxjs';
import { ResponseInterceptor } from './response.interceptor';
import { PAYMENT } from 'src/constants/test-constants';

const CONTEXT: any = {
  switchToHttp: () => ({
    getRequest: () => ({
      headers: {},
      body: {},
      params: {},
      query: {},
    }),
  }),
};

const NEXT: any = {
  handle: () => {
    return of(PAYMENT);
  },
};

describe('ResponseInterceptor', () => {
  const interceptor = new ResponseInterceptor();
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
  it('should return payment object', async () => {
    await expect(
      lastValueFrom(interceptor.intercept(CONTEXT, NEXT).pipe(first())),
    ).resolves.toEqual(PAYMENT);
  });
  it('should return payment object with payment method', async () => {
    const NEXT = {
      handle: () => {
        return of({ ...PAYMENT, paymentMethod: 'bank_transfer' });
      },
    };
    await expect(
      lastValueFrom(interceptor.intercept(CONTEXT, NEXT).pipe(first())),
    ).resolves.toEqual({ ...PAYMENT, paymentMethod: 'bank_transfer' });
  });
});
