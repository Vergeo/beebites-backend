import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TenantsModule } from '../tenants/tenants.module';
import { MenuModule } from '../menu/menu.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), TenantsModule, MenuModule, OrdersModule],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
