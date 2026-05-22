import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export enum TenantStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  REJECTED = 'rejected',
}

@Entity('tenants')
export class Tenant {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  tenantId: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500 })
  tenantName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500, nullable: true })
  tenantDescription: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500, nullable: true })
  tenantLogo: string;

  @ApiProperty()
  @Column({ type: 'time', nullable: true })
  tenantOpenTime: string;

  @ApiProperty()
  @Column({ type: 'time', nullable: true })
  tenantCloseTime: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500, default: TenantStatus.PENDING })
  status: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}