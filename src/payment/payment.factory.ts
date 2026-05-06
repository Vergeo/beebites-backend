import { Injectable } from '@nestjs/common';
import { PaymentInterface, QRISPayment } from './payment.implementations';

@Injectable()
export class PaymentFactory {
  createPayment(): PaymentInterface {
    return new QRISPayment();
  }
}