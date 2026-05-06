import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('reports')
export class Report {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  reportId: number;

  @ApiProperty()
  @Column()
  tenantId: number;

  @ApiProperty()
  @Column()
  period: string;

  @ApiProperty()
  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  totalRevenue: number;

  @ApiProperty()
  @Column({ default: 0 })
  totalOrders: number;

  @CreateDateColumn()
  generatedAt: Date;
}
