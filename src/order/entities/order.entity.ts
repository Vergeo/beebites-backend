import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '../../menu/entities/menu.entity';
import { Payment } from '../../payment/entities/payment.entity';

@Entity('order')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  orderId: number;

  @ApiProperty()
  @Column()
  menuId: number;

  @ApiProperty()
  @Column({ nullable: true })
  paymentId: number;

  @ApiProperty()
  @Column({ type: 'integer', default: 1 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Menu, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menuId' })
  menu: Menu;

  @ManyToOne(() => Payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'paymentId' })
  payment: Payment;
}