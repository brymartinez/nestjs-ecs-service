import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { PaymentStatus } from './shared/enums';
import { PostPaymentDTO } from './dto/post-payment.dto';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { ValidationPipe } from './pipes/validation/validation.pipe';
import { StatusPipe } from './pipes/status/status.pipe';
import { PaymentPipe } from './pipes/payment/payment.pipe';
import { RefNoPipe } from './pipes/refno/ref-no.pipe';
import { HeadersDTO } from './dto/headers.dto';
import { PaymentHeaders } from './decorators/payment-headers';

@Controller('v1') // TODO - use versioning
@UseInterceptors(ResponseInterceptor)
export class AppController {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  @Post()
  async createPayment(
    @PaymentHeaders(ValidationPipe) headers: HeadersDTO,
    @Body(ValidationPipe) dto: CreatePaymentDTO,
  ): Promise<Payment> {
    return this.paymentRepository.save({ ...dto, ...headers });
  }

  @Get(':id')
  async getPayment(
    @PaymentHeaders(ValidationPipe) _headers: HeadersDTO,
    @Param('id', PaymentPipe) payment: Payment,
  ): Promise<Payment> {
    return payment;
  }

  @Get()
  async getPaymentByRefNo(
    @PaymentHeaders(ValidationPipe) _headers: HeadersDTO,
    @Query('rrn', RefNoPipe) payment: Payment,
  ): Promise<Payment> {
    return payment;
  }

  @Post(':id')
  async postPayment(
    @PaymentHeaders(ValidationPipe) _headers: HeadersDTO,
    @Param('id', PaymentPipe, new StatusPipe([PaymentStatus.CREATED]))
    payment: Payment,
    @Body(ValidationPipe)
    dto: PostPaymentDTO,
  ): Promise<Payment> {
    return this.paymentRepository.save({
      ...payment,
      ...dto,
      status: PaymentStatus.SUCCESS,
    });
  }

  @Post(':id/reverse')
  async reversePayment(
    @PaymentHeaders(ValidationPipe) _headers: HeadersDTO,
    @Param(
      'id',
      PaymentPipe,
      new StatusPipe([PaymentStatus.CREATED, PaymentStatus.SUCCESS]),
    )
    payment: Payment,
  ): Promise<Payment> {
    const finalStatus: PaymentStatus =
      payment.status === PaymentStatus.CREATED
        ? PaymentStatus.CANCELLED
        : PaymentStatus.REVERSED;
    return this.paymentRepository.save({
      ...payment,
      status: finalStatus,
    });
  }
}
