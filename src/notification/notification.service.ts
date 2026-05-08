import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  private observers: ((notification: Notification) => void)[] = [];

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  // Register an observer
  subscribe(observer: (notification: Notification) => void): void {
    this.observers.push(observer);
  }

  // Notify all observers
  private broadcast(notification: Notification): void {
    this.observers.forEach((observer) => observer(notification));
  }

  // Called by other services when an event happens
  async notify(message: string, type: string, referenceId: number): Promise<Notification> {
    const notification = this.notificationRepository.create({ message, type, referenceId });
    const saved = await this.notificationRepository.save(notification);
    this.broadcast(saved);
    return saved;
  }

  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationRepository.find({ order: { createdAt: 'DESC' } });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { notificationId } });
    if (notification) {
      notification.isRead = true;
      return this.notificationRepository.save(notification);
    }
    return notification;
  }
}
