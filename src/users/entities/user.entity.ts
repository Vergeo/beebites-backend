import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  TableInheritance,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  CUSTOMER = 'customer',
  TENANT = 'tenant',
  ADMIN = 'admin',
}

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  userId: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ enum: UserRole })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
