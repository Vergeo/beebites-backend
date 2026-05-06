import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TenantsModule } from '../tenants/tenants.module';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), TenantsModule, MenuModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
