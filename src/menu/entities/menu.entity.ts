import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity('menus')
export class Menu {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  menuId: number;

  @ApiProperty()
  @Column()
  tenantId: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500 })
  menuName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500, nullable: true })
  menuDescription: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500, nullable: true })
  menuImage: string;

  @ApiProperty()
  @Column({ type: 'integer', default: 0 })
  menuPrice: number;

  @ApiProperty()
  @Column({ type: 'integer', default: 1 })
  isAvailable: number;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;
}
