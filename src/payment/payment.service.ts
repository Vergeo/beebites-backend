import { Injectable } from '@nestjs/common';
import { PaymentFactory } from './payment.factory';
import { OrdersService } from '../orders/orders.service';
import { ProcessPaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentFactory: PaymentFactory,
    private readonly ordersService: OrdersService,
  ) {}

  displayPaymentMethod(): string {
    return 'qris';
  }

  async processPayment(dto: ProcessPaymentDto): Promise<boolean> {
    const order = await this.ordersService.findOne(dto.orderId);
    const paymentProcessor = this.paymentFactory.createPayment();
    const success = await paymentProcessor.processPayment(order);
    if (success) {
      await this.ordersService.recordPayment(dto.orderId, 'paid');
    }
    return success;
  }

  async confirmPayment(orderId: number): Promise<boolean> {
    const order = await this.ordersService.findOne(orderId);
    return order.paymentStatus === 'paid';
  }

  generateQRCode(orderId: number): string {
    const qris = new (require('./payment.implementations').QRISPayment)();
    return qris.generateQRCode();
  }
}