import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { TenantsService } from '../tenants/tenants.service';
import { CreateTenantDto, UpdateTenantDto } from '../tenants/dto/tenant.dto';
import { MenuService } from '../menu/menu.service';
import { UpdateMenuItemDto } from '../menu/dto/menu.dto';
import { MenuItem } from '../menu/entities/menu-item.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly tenantsService: TenantsService,
    private readonly menuService: MenuService,
  ) {}

  async findOne(adminId: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { adminId } });
    if (!admin) throw new NotFoundException(`Admin #${adminId} not found`);
    return admin;
  }

  async addTenant(dto: CreateTenantDto) {
    return this.tenantsService.addTenant(dto);
  }

  async updateTenant(tenantId: number, dto: UpdateTenantDto) {
    return this.tenantsService.updateTenant(tenantId, dto);
  }

  async deleteTenant(tenantId: number): Promise<void> {
    return this.tenantsService.deleteTenant(tenantId);
  }

  async getAllTenants() {
    return this.tenantsService.getAllTenants();
  }

  async manageMenuItem(itemId: number, dto: UpdateMenuItemDto): Promise<MenuItem> {
    return this.menuService.updateMenuItem(itemId, dto);
  }
}
