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
    return this.paymentRepository.find({ where: { userId } });
  }

  async getAllPaymentsByTenant(tenantId: number): Promise<Payment[]> {
    return this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.user', 'user')
      .innerJoin('order', 'order', 'order.paymentId = payment.paymentId')
      .innerJoin('menus', 'menu', 'menu.menuId = order.menuId')
      .where('menu.tenantId = :tenantId', { tenantId })
      .distinct(true)
      .getMany();
  }

  async getPaymentDetails(paymentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { paymentId },
      relations: ['user'],
    });
    if (!payment) throw new NotFoundException(`Payment #${paymentId} not found`);
    return payment;
  }

  async createPayment(dto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(dto);
    const saved = await this.paymentRepository.save(payment);
    await this.notificationService.notify(
      `Payment #${saved.paymentId} created by user #${saved.userId} via ${saved.paymentType}`,
      'payment_created',
      saved.paymentId,
    );
    return saved;
  }

  async deletePayment(paymentId: number): Promise<{ message: string }> {
    const payment = await this.getPaymentDetails(paymentId);
    await this.paymentRepository.remove(payment);
    return { message: `Payment #${paymentId} deleted successfully` };
  }
}