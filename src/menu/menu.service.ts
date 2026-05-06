import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { MenuItem } from './entities/menu-item.entity';
import { CreateMenuDto, CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async getMenuByTenant(tenantId: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { tenantId },
      relations: ['menuItems'],
    });
    if (!menu) throw new NotFoundException(`Menu for tenant #${tenantId} not found`);
    return menu;
  }

  async createMenu(dto: CreateMenuDto): Promise<Menu> {
    const menu = this.menuRepository.create(dto);
    return this.menuRepository.save(menu);
  }

  async getItems(menuId: number): Promise<MenuItem[]> {
    return this.menuItemRepository.find({ where: { menuId } });
  }

  async addMenuItem(menuId: number, dto: CreateMenuItemDto): Promise<MenuItem> {
    const menu = await this.menuRepository.findOne({ where: { menuId } });
    if (!menu) throw new NotFoundException(`Menu #${menuId} not found`);
    const item = this.menuItemRepository.create({ ...dto, menuId });
    return this.menuItemRepository.save(item);
  }

  async updateMenuItem(itemId: number, dto: UpdateMenuItemDto): Promise<MenuItem> {
    const item = await this.menuItemRepository.findOne({ where: { itemId } });
    if (!item) throw new NotFoundException(`MenuItem #${itemId} not found`);
    Object.assign(item, dto);
    return this.menuItemRepository.save(item);
  }

  async removeMenuItem(itemId: number): Promise<void> {
    const item = await this.menuItemRepository.findOne({ where: { itemId } });
    if (!item) throw new NotFoundException(`MenuItem #${itemId} not found`);
    await this.menuItemRepository.remove(item);
  }

  async getItemById(itemId: number): Promise<MenuItem> {
    const item = await this.menuItemRepository.findOne({ where: { itemId } });
    if (!item) throw new NotFoundException(`MenuItem #${itemId} not found`);
    return item;
  }

  async updateStock(itemId: number, quantity: number): Promise<MenuItem> {
    const item = await this.getItemById(itemId);
    item.updateStock(quantity);
    return this.menuItemRepository.save(item);
  }
}
