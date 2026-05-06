import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}

export class UpdateOperationalHoursDto {
  @ApiProperty({ example: '08:00' })
  @IsString()
  openTime: string;

  @ApiProperty({ example: '22:00' })
  @IsString()
  closeTime: string;
}
