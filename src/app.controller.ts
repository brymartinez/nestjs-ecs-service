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

@Controller('v1')
@UseInterceptors()
export class AppController {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  @Post()
  async createPayment(@Body() dto: CreatePaymentDTO): Promise<Payment> {
    return this.paymentRepository.save(dto);
  }

  @Get(':id')
  async getPayment(@Param() id: string): Promise<Payment> {
    return this.paymentRepository.findOneBy({ id });
  }

  @Get()
  async getPaymentByRRN(@Query('rrn') rrn: string): Promise<Payment> {
    return this.paymentRepository.findOneBy({ refNo: rrn });
  }

  @Post(':id')
  async postPayment(
    @Param() id: string,
    @Body() dto: PostPaymentDTO,
  ): Promise<Payment> {
    return this.paymentRepository.save({
      id,
      status: PaymentStatus.SUCCESS, // or FAILED
      ...dto,
    });
  }

  @Post(':id/reverse')
  async reversePayment(@Param() id: string): Promise<Payment> {
    return this.paymentRepository.save({
      id,
      status: PaymentStatus.REVERSED, // or CANCELLED
    });
  }
}
