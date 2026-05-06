import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('customers')
export class Customer {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  customerId: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  address: string;
}
