import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { GenerateReportDto } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  calculateRevenue(orders: Order[]): number {
    return orders
      .filter((o) => o.status === OrderStatus.COMPLETED)
      .reduce((sum, o) => sum + Number(o.totalPrice), 0);
  }

  calculateOrderCount(orders: Order[]): number {
    return orders.filter((o) => o.status === OrderStatus.COMPLETED).length;
  }

  async generateReport(dto: GenerateReportDto): Promise<Report> {
    const orders = await this.orderRepository.find({
      where: { tenantId: dto.tenantId },
    });

    const totalRevenue = this.calculateRevenue(orders);
    const totalOrders = this.calculateOrderCount(orders);

    const report = this.reportRepository.create({
      tenantId: dto.tenantId,
      period: dto.period,
      totalRevenue,
      totalOrders,
    });

    return this.reportRepository.save(report);
  }

  async getReportsByTenant(tenantId: number): Promise<Report[]> {
    return this.reportRepository.find({
      where: { tenantId },
      order: { generatedAt: 'DESC' },
    });
  }

  async getOrderSummary(tenantId: number): Promise<{
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    totalRevenue: number;
  }> {
    const orders = await this.orderRepository.find({ where: { tenantId } });

    return {
      totalOrders: orders.length,
      completedOrders: orders.filter((o) => o.status === OrderStatus.COMPLETED).length,
      pendingOrders: orders.filter((o) => o.status === OrderStatus.PENDING).length,
      totalRevenue: this.calculateRevenue(orders),
    };
  }

  async getTopItems(tenantId: number): Promise<{ itemId: number; name: string; count: number }[]> {
    const orders = await this.orderRepository.find({
      where: { tenantId, status: OrderStatus.COMPLETED },
      relations: ['items'],
    });

    const itemCounts: Record<number, { name: string; count: number }> = {};
    for (const order of orders) {
      for (const item of order.items || []) {
        if (!itemCounts[item.itemId]) {
          itemCounts[item.itemId] = { name: item.name, count: 0 };
        }
        itemCounts[item.itemId].count++;
      }
    }

    return Object.entries(itemCounts)
      .map(([itemId, data]) => ({ itemId: +itemId, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
}
