import { IsNumber, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ enum: ['qris', 'cash', 'transfer'], example: 'qris' })
  @IsString()
  @IsIn(['qris', 'cash', 'transfer'])
  paymentType: string;
}