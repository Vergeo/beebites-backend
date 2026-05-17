import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('payments')
export class Payment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  paymentId: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500 })
  paymentType: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}