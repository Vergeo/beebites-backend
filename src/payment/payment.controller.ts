import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { ProcessPaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Payment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Get payment method' })
  @Get('method')
  displayPaymentMethod() {
    return this.paymentService.displayPaymentMethod();
  }

  @ApiOperation({ summary: 'Process QRIS payment for an order' })
  @Post('process')
  processPayment(@Body() dto: ProcessPaymentDto) {
    return this.paymentService.processPayment(dto);
  }

  @ApiOperation({ summary: 'Generate QRIS code for an order' })
  @Get('qris/:orderId')
  generateQRCode(@Param('orderId') orderId: string) {
    return this.paymentService.generateQRCode(+orderId);
  }

  @ApiOperation({ summary: 'Confirm payment status' })
  @Get('confirm/:orderId')
  confirmPayment(@Param('orderId') orderId: string) {
    return this.paymentService.confirmPayment(+orderId);
  }
}