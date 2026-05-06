import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MenuItem } from '../../menu/entities/menu-item.entity';

@Entity('carts')
export class Cart {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  cartId: number;

  @ApiProperty()
  @Column()
  customerId: number;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @ManyToMany(() => MenuItem, { eager: true })
  @JoinTable({ name: 'cart_items' })
  items: MenuItem[];

  calculateTotal(): number {
    this.totalAmount = this.items?.reduce((sum, item) => sum + Number(item.price), 0) || 0;
    return this.totalAmount;
  }
}
