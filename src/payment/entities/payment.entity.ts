import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../order/entities/order.entity';

@Entity('payments')
export class Payment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  paymentId: number;

  @ApiProperty()
  @Column()
  orderId: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500 })
  paymentType: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Order, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
