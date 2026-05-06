import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get orders by tenant' })
  @Get('tenant/:tenantId')
  getOrdersByTenant(@Param('tenantId') tenantId: string) {
    return this.ordersService.getOrdersByTenant(+tenantId);
  }

  @ApiOperation({ summary: 'Get orders by customer' })
  @Get('customer/:customerId')
  getOrdersByCustomer(@Param('customerId') customerId: string) {
    return this.ordersService.getOrdersByCustomer(+customerId);
  }

  @ApiOperation({ summary: 'Get order history for customer' })
  @Get('customer/:customerId/history')
  getOrderHistory(@Param('customerId') customerId: string) {
    return this.ordersService.getOrderHistory(+customerId);
  }

  @ApiOperation({ summary: 'Track order status' })
  @Get(':id/track')
  trackOrder(@Param('id') id: string) {
    return this.ordersService.trackOrder(+id);
  }

  @ApiOperation({ summary: 'Accept order (Tenant)' })
  @Put(':id/accept')
  acceptOrder(@Param('id') id: string) {
    return this.ordersService.acceptOrder(+id);
  }

  @ApiOperation({ summary: 'Reject order (Tenant)' })
  @Put(':id/reject')
  rejectOrder(@Param('id') id: string) {
    return this.ordersService.rejectOrder(+id);
  }

  @ApiOperation({ summary: 'Update order status' })
  @Put(':id/status')
  updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(+id, dto);
  }
}
