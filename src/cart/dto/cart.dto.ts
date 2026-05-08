import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMenuToCartDto {
  @ApiProperty()
  @IsNumber()
  menuId: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpdateCartDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
