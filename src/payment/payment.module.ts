import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentFactory } from './payment.factory';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  providers: [PaymentService, PaymentFactory],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
