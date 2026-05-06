import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { OperationalHours } from './entities/operational-hours.entity';
import { CreateTenantDto, UpdateTenantDto, UpdateOperationalHoursDto } from './dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(OperationalHours)
    private readonly opHoursRepository: Repository<OperationalHours>,
  ) {}

  async getAllTenants(): Promise<Tenant[]> {
    return this.tenantRepository.find({ relations: ['operationalHours'] });
  }

  async findOne(tenantId: number): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({
      where: { tenantId },
      relations: ['operationalHours'],
    });
    if (!tenant) throw new NotFoundException(`Tenant #${tenantId} not found`);
    return tenant;
  }

  async addTenant(dto: CreateTenantDto): Promise<Tenant> {
    const opHours = this.opHoursRepository.create({ openTime: '08:00', closeTime: '22:00' });
    await this.opHoursRepository.save(opHours);
    const tenant = this.tenantRepository.create({ ...dto, operationalHours: opHours });
    return this.tenantRepository.save(tenant);
  }

  async updateTenant(tenantId: number, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(tenantId);
    Object.assign(tenant, dto);
    return this.tenantRepository.save(tenant);
  }

  async deleteTenant(tenantId: number): Promise<void> {
    const tenant = await this.findOne(tenantId);
    await this.tenantRepository.remove(tenant);
  }

  async updateOperationalHours(tenantId: number, dto: UpdateOperationalHoursDto): Promise<Tenant> {
    const tenant = await this.findOne(tenantId);
    if (!tenant.operationalHours) {
      const opHours = this.opHoursRepository.create(dto);
      tenant.operationalHours = await this.opHoursRepository.save(opHours);
    } else {
      tenant.operationalHours.updateHours(dto.openTime, dto.closeTime);
      await this.opHoursRepository.save(tenant.operationalHours);
    }
    return this.tenantRepository.save(tenant);
  }

  async checkIfOpen(tenantId: number): Promise<boolean> {
    const tenant = await this.findOne(tenantId);
    if (!tenant.operationalHours) return false;
    const now = new Date().toTimeString().substring(0, 5);
    return tenant.operationalHours.checkIfOpen(now);
  }
}
