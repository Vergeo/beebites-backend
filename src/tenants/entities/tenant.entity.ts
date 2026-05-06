import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ChildEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { OperationalHours } from './operational-hours.entity';
import { Menu } from '../../menu/entities/menu.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('tenants')
export class Tenant {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  tenantId: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  imageUrl: string;

  @OneToOne(() => OperationalHours, { cascade: true, eager: true })
  @JoinColumn()
  operationalHours: OperationalHours;

  @OneToOne(() => Menu, { cascade: true })
  @JoinColumn()
  menu: Menu;
}
