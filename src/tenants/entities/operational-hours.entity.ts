import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('operational_hours')
export class OperationalHours {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'time' })
  openTime: string;

  @ApiProperty()
  @Column({ type: 'time' })
  closeTime: string;

  @ApiProperty()
  @Column({ default: true })
  isOpen: boolean;

  checkIfOpen(currentTime: string): boolean {
    return this.isOpen && currentTime >= this.openTime && currentTime <= this.closeTime;
  }

  updateHours(open: string, close: string): void {
    this.openTime = open;
    this.closeTime = close;
  }
}
