import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  @IsNumber()
  tenantId: number;

  @ApiProperty()
  @IsString()
  menuName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  menuDescription?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  menuImage?: string;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  menuPrice?: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @IsOptional()
  isAvailable?: number;
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
