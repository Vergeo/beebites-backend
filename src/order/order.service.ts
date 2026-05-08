import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/order.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly notificationService: NotificationService,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(dto);
    const saved = await this.orderRepository.save(order);
    // Observer Pattern: notify when order is created
    await this.notificationService.notify(
      `New order #${saved.orderId} created by user #${saved.userId}`,
      'order_created',
      saved.orderId,
    );
    return saved;
  }

  async getOrder(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['menu', 'user'],
    });
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);
    return order;
  }

  async deleteOrder(orderId: number): Promise<{ message: string }> {
    const order = await this.getOrder(orderId);
    await this.orderRepository.remove(order);
    return { message: `Order #${orderId} deleted successfully` };
  }
}
