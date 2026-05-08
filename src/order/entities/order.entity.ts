import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Menu } from '../../menu/entities/menu.entity';

@Entity('order')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  orderId: number;

  @ApiProperty()
  @Column()
  userId: number;

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

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Menu, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menuId' })
  menu: Menu;
}
