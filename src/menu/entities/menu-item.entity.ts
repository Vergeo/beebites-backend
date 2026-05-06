import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Menu } from './menu.entity';

@Entity('menu_items')
export class MenuItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  itemId: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty()
  @Column({ default: 0 })
  stock: number;

  @ApiProperty()
  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  menuId: number;

  @ManyToOne(() => Menu, (menu) => menu.menuItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menuId' })
  menu: Menu;

  updateStock(quantity: number): void {
    this.stock += quantity;
    this.isAvailable = this.stock > 0;
  }

  updateItem(name: string, price: number): void {
    this.name = name;
    this.price = price;
  }
}
