import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), MenuModule],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
