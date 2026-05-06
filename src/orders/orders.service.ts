import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly menuService: MenuService,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const items = await Promise.all(dto.itemIds.map((id) => this.menuService.getItemById(id)));
    const order = this.orderRepository.create({
      customerId: dto.customerId,
      tenantId: dto.tenantId,
      items,
      paymentMethod: dto.paymentMethod,
    });
    order.calculateTotal();
    return this.orderRepository.save(order);
  }

  async findOne(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { orderId }, relations: ['items'] });
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);
    return order;
  }

  async viewOrders(tenantId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { tenantId }, relations: ['items'] });
  }

  async getOrdersByCustomer(customerId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { customerId }, relations: ['items'] });
  }

  async getOrdersByTenant(tenantId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { tenantId }, relations: ['items'] });
  }

  async getOrderHistory(customerId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customerId, status: OrderStatus.COMPLETED },
      relations: ['items'],
    });
  }

  async acceptOrder(orderId: number): Promise<Order> {
    return this.updateStatus(orderId, OrderStatus.ACCEPTED);
  }

  async rejectOrder(orderId: number): Promise<Order> {
    return this.updateStatus(orderId, OrderStatus.REJECTED);
  }

  async updateOrderStatus(orderId: number, dto: UpdateOrderStatusDto): Promise<Order> {
    return this.updateStatus(orderId, dto.status);
  }

  async trackOrder(orderId: number): Promise<OrderStatus> {
    const order = await this.findOne(orderId);
    return order.status;
  }

  async recordPayment(orderId: number, status: string): Promise<Order> {
    const order = await this.findOne(orderId);
    order.recordPayment(status);
    return this.orderRepository.save(order);
  }

  private async updateStatus(orderId: number, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(orderId);
    order.updateStatus(status);
    return this.orderRepository.save(order);
  }
}
