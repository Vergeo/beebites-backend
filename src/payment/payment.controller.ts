import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Payment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Get all payments by user' })
  @Get('get-all-payments-by-user/:userId')
  getAllPaymentsByUser(@Param('userId') userId: string) {
    return this.paymentService.getAllPaymentsByUser(+userId);
  }

  @ApiOperation({ summary: 'Get all payments by tenant' })
  @Get('get-all-payments-by-tenant/:tenantId')
  getAllPaymentsByTenant(@Param('tenantId') tenantId: string) {
    return this.paymentService.getAllPaymentsByTenant(+tenantId);
  }

  @ApiOperation({ summary: 'Get payment details' })
  @Get('get-payment-details/:paymentId')
  getPaymentDetails(@Param('paymentId') id: string) {
    return this.paymentService.getPaymentDetails(+id);
  }

  @ApiOperation({ summary: 'Create payment' })
  @Post('create-payment')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @ApiOperation({ summary: 'Delete payment' })
  @Delete('delete-payment/:paymentId')
  deletePayment(@Param('paymentId') id: string) {
    return this.paymentService.deletePayment(+id);
  }
}
