import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDTO } from './dto/create-payment.dto';

@Controller('v1')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  @Post()
  async createPayment(@Body() dto: CreatePaymentDTO): Promise<Payment> {
    return this.paymentRepository.save(dto);
  }
}
