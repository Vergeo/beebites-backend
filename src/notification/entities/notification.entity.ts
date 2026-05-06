import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('notifications')
export class Notification {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  notificationId: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  message: string;

  @ApiProperty()
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty()
  @CreateDateColumn()
  timestamp: Date;
}
