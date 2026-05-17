import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create order' })
  @Post('createOrder')
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @ApiOperation({ summary: 'Get order by ID' })
  @Post('getOrder')
  getOrder(@Body('orderId') orderId: number) {
    return this.orderService.getOrder(orderId);
  }

  @ApiOperation({ summary: 'Get orders by payment ID' })
  @Post('getOrdersByPayment')
  getOrdersByPayment(@Body('paymentId') paymentId: number) {
    return this.orderService.getOrdersByPayment(paymentId);
  }

  @ApiOperation({ summary: 'Delete order' })
  @Post('deleteOrder')
  deleteOrder(@Body('orderId') orderId: number) {
    return this.orderService.deleteOrder(orderId);
  }
}