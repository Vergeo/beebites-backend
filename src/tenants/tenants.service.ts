import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tenant, TenantStatus } from "./entities/tenant.entity";
import { CreateTenantDto, UpdateTenantDto } from "./dto/tenant.dto";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly notificationService: NotificationService,
  ) {}

  async getAllTenants(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async getTenant(tenantId: number): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { tenantId } });
    if (!tenant) throw new NotFoundException(`Tenant #${tenantId} not found`);
    return tenant;
  }

  async createTenant(dto: CreateTenantDto): Promise<Tenant> {
    const tenant = this.tenantRepository.create({
      ...dto,
      status: TenantStatus.PENDING,
    });
    return this.tenantRepository.save(tenant);
  }

  async updateTenant(tenantId: number, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.getTenant(tenantId);
    Object.assign(tenant, dto);
    return this.tenantRepository.save(tenant);
  }

  async deleteTenant(tenantId: number): Promise<{ message: string }> {
    const tenant = await this.getTenant(tenantId);
    await this.tenantRepository.remove(tenant);
    return { message: `Tenant #${tenantId} deleted successfully` };
  }

  // Observer Pattern: notify when tenant is accepted
  async acceptTenant(tenantId: number): Promise<Tenant> {
    const tenant = await this.getTenant(tenantId);
    tenant.status = TenantStatus.ACTIVE;
    const saved = await this.tenantRepository.save(tenant);
    await this.notificationService.notify(
      `Tenant "${tenant.tenantName}" has been accepted and is now active.`,
      "tenant_accepted",
      tenantId,
    );
    return saved;
  }

  // Observer Pattern: notify when tenant is rejected
  async rejectTenant(tenantId: number): Promise<Tenant> {
    const tenant = await this.getTenant(tenantId);
    tenant.status = TenantStatus.REJECTED;
    const saved = await this.tenantRepository.save(tenant);
    await this.notificationService.notify(
      `Tenant "${tenant.tenantName}" has been rejected.`,
      "tenant_rejected",
      tenantId,
    );
    return saved;
  }

  async searchTenants(keyword: string): Promise<Tenant[]> {
    return this.tenantRepository
      .createQueryBuilder("tenant")
      .where("tenant.tenantName ILIKE :keyword", { keyword: `%${keyword}%` })
      .orWhere("tenant.tenantDescription ILIKE :keyword", {
        keyword: `%${keyword}%`,
      })
      .getMany();
  }

  async getTenantByUserId(userId: number): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { userId } });
    if (!tenant)
      throw new NotFoundException(`Tenant for user #${userId} not found`);
    return tenant;
  }
}
