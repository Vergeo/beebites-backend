import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MenuItem } from '../../menu/entities/menu-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PREPARING = 'preparing',
  READY = 'ready',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  orderId: number;

  @ApiProperty()
  @Column()
  customerId: number;

  @ApiProperty()
  @Column()
  tenantId: number;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @ApiProperty({ enum: OrderStatus })
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @ApiProperty()
  @Column({ nullable: true })
  paymentStatus: string;

  @ApiProperty()
  @Column({ nullable: true })
  paymentMethod: string;

  @CreateDateColumn()
  orderDate: Date;

  @ManyToMany(() => MenuItem, { eager: true })
  @JoinTable({ name: 'order_items' })
  items: MenuItem[];

  updateStatus(status: OrderStatus): void {
    this.status = status;
  }

  calculateTotal(): number {
    this.totalPrice = this.items?.reduce((sum, item) => sum + Number(item.price), 0) || 0;
    return this.totalPrice;
  }

  recordPayment(status: string): void {
    this.paymentStatus = status;
  }
}
