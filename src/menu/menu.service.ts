import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async getAllMenusFromTenant(tenantId: number): Promise<Menu[]> {
    return this.menuRepository.find({ where: { tenantId } });
  }

  async getMenu(menuId: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ where: { menuId } });
    if (!menu) throw new NotFoundException(`Menu #${menuId} not found`);
    return menu;
  }

  async createMenu(dto: CreateMenuDto): Promise<Menu> {
    const menu = this.menuRepository.create(dto);
    return this.menuRepository.save(menu);
  }

  async updateMenu(menuId: number, dto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.getMenu(menuId);
    Object.assign(menu, dto);
    return this.menuRepository.save(menu);
  }

  async deleteMenu(menuId: number): Promise<{ message: string }> {
    const menu = await this.getMenu(menuId);
    await this.menuRepository.remove(menu);
    return { message: `Menu #${menuId} deleted successfully` };
  }
}
