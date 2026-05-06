import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { OperationalHours } from './entities/operational-hours.entity';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, OperationalHours])],
  providers: [TenantsService],
  controllers: [TenantsController],
  exports: [TenantsService],
})
export class TenantsModule {}
