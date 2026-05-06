import { IsNumber, IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  customerId: number;

  @ApiProperty()
  @IsNumber()
  tenantId: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  itemIds: number[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paymentMethod?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
