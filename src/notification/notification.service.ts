import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { Order } from '../orders/entities/order.entity';
import { SendNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async sendNotification(dto: SendNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      userId: dto.userId,
      message: dto.message,
    });
    return this.notificationRepository.save(notification);
  }

  async notifyCustomer(order: Order): Promise<Notification> {
    return this.sendNotification({
      userId: order.customerId,
      message: `Your order #${order.orderId} status has been updated to: ${order.status}`,
    });
  }

  async notifyTenant(order: Order): Promise<Notification> {
    return this.sendNotification({
      userId: order.tenantId,
      message: `New order #${order.orderId} received. Total: Rp ${order.totalPrice}`,
    });
  }

  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
    });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { notificationId },
    });
    if (notification) {
      notification.isRead = true;
      return this.notificationRepository.save(notification);
    }
    return notification;
  }

  async getUnreadCount(userId: number): Promise<number> {
    return this.notificationRepository.count({
      where: { userId, isRead: false },
    });
  }
}
