import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessPaymentDto {
  @ApiProperty()
  @IsNumber()
  orderId: number;
}