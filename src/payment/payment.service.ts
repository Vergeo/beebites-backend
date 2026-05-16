import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/payment.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly notificationService: NotificationService,
  ) {}

  async getAllPaymentsByUser(userId: number): Promise<Payment[]> {
    return this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.order', 'order')
      .where('order.userId = :userId', { userId })
      .getMany();
  }

  async getAllPaymentsByTenant(tenantId: number): Promise<Payment[]> {
    return this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.order', 'order')
      .leftJoinAndSelect('order.menu', 'menu')
      .where('menu.tenantId = :tenantId', { tenantId })
      .getMany();
  }

  async getPaymentDetails(paymentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { paymentId },
      relations: ['order', 'order.menu', 'order.user'],
    });
    if (!payment) throw new NotFoundException(`Payment #${paymentId} not found`);
    return payment;
  }

  async createPayment(dto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(dto);
    const saved = await this.paymentRepository.save(payment);

    // Update paymentId di order
    await this.paymentRepository.manager.update(
      'order',
      { orderId: dto.orderId },
      { paymentId: saved.paymentId },
    );

    await this.notificationService.notify(
      `Payment #${saved.paymentId} created for order #${saved.orderId} via ${saved.paymentType}`,
      'payment_created', saved.paymentId,
    );
    return saved;
  }

  async deletePayment(paymentId: number): Promise<{ message: string }> {
    const payment = await this.getPaymentDetails(paymentId);
    await this.paymentRepository.remove(payment);
    return { message: `Payment #${paymentId} deleted successfully` };
  }
}
