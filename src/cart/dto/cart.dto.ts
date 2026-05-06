import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty()
  @IsNumber()
  itemId: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  quantity: number;
}

export class UpdateCartQuantityDto {
  @ApiProperty()
  @IsNumber()
  itemId: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}
