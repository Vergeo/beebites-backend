import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  stock?: number;
}

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {}

export class CreateMenuDto {
  @ApiProperty()
  @IsNumber()
  tenantId: number;
}
