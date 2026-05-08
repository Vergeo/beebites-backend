import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('notifications')
export class Notification {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  notificationId: number;

  @ApiProperty()
  @Column()
  message: string;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  referenceId: number;

  @ApiProperty()
  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
