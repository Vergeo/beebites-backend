import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}
