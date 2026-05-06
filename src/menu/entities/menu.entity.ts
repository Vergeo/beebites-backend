import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MenuItem } from './menu-item.entity';

@Entity('menus')
export class Menu {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  menuId: number;

  @ApiProperty()
  @Column()
  tenantId: number;

  @OneToMany(() => MenuItem, (item) => item.menu, { cascade: true, eager: true })
  menuItems: MenuItem[];

  displayMenu(): void {
    console.log(`Menu for tenant ${this.tenantId}`, this.menuItems);
  }

  addMenuItem(item: MenuItem): void {
    this.menuItems = [...(this.menuItems || []), item];
  }

  removeMenuItem(itemId: number): void {
    this.menuItems = this.menuItems.filter((i) => i.itemId !== itemId);
  }
}
