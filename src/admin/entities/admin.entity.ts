import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('admins')
export class Admin {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  adminId: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;
}
